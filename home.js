/* BottegaAI - simulador, captura estática e analytics */

// revisar a cada release
const LLM_OPTIONS = [
    { value: 'claude-sonnet-5', label: 'Claude Sonnet 5', profile: 'Raciocínio e agentes complexos', factor: 1.15 },
    { value: 'gpt-5-6-terra', label: 'GPT-5.6 Terra', profile: 'Trabalho profissional e orquestração', factor: 1.1 },
    { value: 'gemini-3-8-flash', label: 'Gemini 3.8 Flash', profile: 'Velocidade e fluxos multimodais', factor: 0.95 }
];

const EMAIL_CAPTURE_ENDPOINT = ''; // TODO: configurar endpoint próprio antes de persistir e-mails.

const ARCHETYPES = {
    analyst: {
        title: 'Estrategista financeiro',
        description: 'Lê dados autorizados, compara cenários e prepara uma síntese para validação humana.',
        baseHours: 6,
        leverage: 2.4
    },
    researcher: {
        title: 'Agente de pesquisa',
        description: 'Pesquisa fontes, registra referências e sintetiza evidências para uma decisão executiva.',
        baseHours: 7,
        leverage: 2.6
    },
    operations: {
        title: 'Orquestrador operacional',
        description: 'Coordena etapas entre sistemas, solicita aprovações e registra o resultado de cada execução.',
        baseHours: 8,
        leverage: 2.9
    },
    product: {
        title: 'Prototipador de produto',
        description: 'Transforma requisitos em especificações, protótipos verificáveis e uma lista de decisões pendentes.',
        baseHours: 7,
        leverage: 2.7
    }
};

const AUTONOMY = {
    1: { label: 'Assistente', factor: 0.7 },
    2: { label: 'Copiloto com validação humana', factor: 1 },
    3: { label: 'Autônomo com limites e validação', factor: 1.2 }
};

function track(eventName, detail = {}) {
    const payload = { event: eventName, ...detail };
    let sentToDataLayer = false;

    if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
        sentToDataLayer = true;
    }

    window.dispatchEvent(new CustomEvent('bottega:analytics', { detail: payload }));

    if (!sentToDataLayer && window.console && typeof window.console.info === 'function') {
        window.console.info('[BottegaAI analytics]', payload);
    }
}

function populateModels(select) {
    const fragment = document.createDocumentFragment();
    LLM_OPTIONS.forEach((model) => {
        const option = document.createElement('option');
        option.value = model.value;
        option.textContent = `${model.label} - ${model.profile}`;
        fragment.appendChild(option);
    });
    select.replaceChildren(fragment);
}

function getSimulatorState(elements) {
    const selectedArchetype = document.querySelector('input[name="archetype"]:checked');
    const archetypeKey = selectedArchetype ? selectedArchetype.value : 'analyst';
    const archetype = ARCHETYPES[archetypeKey] || ARCHETYPES.analyst;
    const model = LLM_OPTIONS.find((item) => item.value === elements.llmSelect.value) || LLM_OPTIONS[0];
    const autonomy = AUTONOMY[elements.autonomyRange.value] || AUTONOMY[2];
    const checkedTools = Array.from(elements.toolCheckboxes).filter((input) => input.checked);
    const tools = checkedTools.map((input) => input.dataset.tool);
    const toolFactor = 1 + (checkedTools.length * 0.08);

    return {
        archetype,
        model,
        autonomy,
        tools,
        estimatedHours: Math.max(1, Math.round(archetype.baseHours * autonomy.factor * toolFactor * model.factor)),
        estimatedLeverage: Math.max(1, (archetype.leverage * autonomy.factor * toolFactor * model.factor).toFixed(1))
    };
}

function renderCodex(elements) {
    const state = getSimulatorState(elements);
    elements.outputTitle.textContent = state.archetype.title;
    elements.outputEngine.textContent = state.model.label;
    elements.outputAutonomy.textContent = state.autonomy.label;
    elements.outputTools.textContent = state.tools.length ? state.tools.join(', ') : 'Nenhuma integração selecionada';
    elements.outputDescription.textContent = state.archetype.description;
    elements.outputHours.textContent = state.estimatedHours;
    elements.outputLeverage.textContent = `${state.estimatedLeverage}x`;
    elements.locked.hidden = true;
    elements.result.hidden = false;
    elements.result.setAttribute('tabindex', '-1');
    elements.result.focus({ preventScroll: true });
    track('simulator_complete', {
        archetype: document.querySelector('input[name="archetype"]:checked')?.value || 'analyst',
        model: state.model.value,
        tool_count: state.tools.length,
        autonomy: elements.autonomyRange.value
    });
}

function initializeSimulator() {
    const form = document.getElementById('sim-controls');
    const synthesizeButton = document.getElementById('btn-synthesize-agent');
    const llmSelect = document.getElementById('sim-llm-select');
    const autonomyRange = document.getElementById('autonomy-range');
    const gate = document.getElementById('email-gate');
    const emailInput = document.getElementById('sim-email');
    const consentInput = document.getElementById('sim-consent');
    const error = document.getElementById('email-error');

    if (!form || !synthesizeButton || !llmSelect || !autonomyRange || !gate || !emailInput || !consentInput || !error) {
        return;
    }

    const elements = {
        form,
        llmSelect,
        autonomyRange,
        toolCheckboxes: document.querySelectorAll('.checkbox-option input[type="checkbox"]'),
        locked: document.getElementById('codex-locked'),
        result: document.getElementById('codex-result'),
        outputTitle: document.querySelector('.blueprint-agent-title'),
        outputEngine: document.getElementById('meta-engine'),
        outputAutonomy: document.getElementById('meta-autonomy'),
        outputTools: document.getElementById('meta-tools'),
        outputDescription: document.getElementById('blueprint-desc-text'),
        outputHours: document.getElementById('metric-hours'),
        outputLeverage: document.getElementById('metric-roi'),
        captureStatus: document.getElementById('capture-status')
    };

    populateModels(llmSelect);

    document.querySelectorAll('.radio-option input').forEach((input) => {
        input.addEventListener('change', () => {
            document.querySelectorAll('.radio-option').forEach((option) => option.classList.remove('active'));
            input.closest('.radio-option')?.classList.add('active');
        });
    });

    elements.toolCheckboxes.forEach((input) => {
        input.addEventListener('change', () => input.closest('.checkbox-option')?.classList.toggle('active', input.checked));
    });

    synthesizeButton.addEventListener('click', () => {
        track('simulator_start');
        gate.hidden = false;
        elements.result.hidden = true;
        elements.locked.hidden = false;
        error.textContent = '';
        emailInput.focus();
        gate.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        error.textContent = '';

        if (!emailInput.validity.valid) {
            error.textContent = 'Informe um e-mail válido para liberar o Codex Agentis.';
            emailInput.setAttribute('aria-invalid', 'true');
            emailInput.focus();
            return;
        }

        emailInput.removeAttribute('aria-invalid');
        if (!consentInput.checked) {
            error.textContent = 'Confirme o consentimento para liberar o resultado.';
            consentInput.setAttribute('aria-invalid', 'true');
            consentInput.focus();
            return;
        }

        consentInput.removeAttribute('aria-invalid');
        const submitButton = document.getElementById('email-submit');

        if (EMAIL_CAPTURE_ENDPOINT) {
            try {
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Enviando...';
                }
                const response = await fetch(EMAIL_CAPTURE_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: emailInput.value.trim(),
                        consent: true,
                        source: 'bottegaai-simulator'
                    })
                });
                if (!response.ok) {
                    throw new Error(`Falha de captura: ${response.status}`);
                }
                track('email_captured', { capture_mode: 'endpoint' });
                if (elements.captureStatus) {
                    elements.captureStatus.textContent = 'E-mail registrado. Codex liberado nesta tela.';
                }
            } catch (captureError) {
                error.textContent = 'Não foi possível registrar o e-mail agora. Tente novamente.';
                return;
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Receber meu Codex';
                }
            }
        } else {
            // TODO: configurar um endpoint com política de retenção e consentimento definidos.
            // A versão estática libera o resultado sem enviar nem persistir o endereço.
            track('email_gate_completed', { capture_mode: 'static_gate_no_persistence' });
            if (elements.captureStatus) {
                elements.captureStatus.textContent = 'Codex liberado nesta tela. O e-mail não foi enviado nem armazenado.';
            }
        }

        renderCodex(elements);
    });
}

function initializeAnalytics() {
    track('view_hero');

    document.querySelectorAll('.js-checkout').forEach((link) => {
        link.addEventListener('click', () => track('click_checkout', { checkout_provider: 'stripe' }));
    });

    document.querySelectorAll('.js-corporate, a[href="#corporate"]').forEach((link) => {
        link.addEventListener('click', () => track('click_corporate'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSimulator();
    initializeAnalytics();
});
