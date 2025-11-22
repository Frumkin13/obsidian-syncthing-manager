import { App, Modal, Setting, Notice, TextAreaComponent } from 'obsidian';
import { IgnoreManager } from '../services/ignore-manager';
import { t } from '../lang/lang';

export class IgnoreModal extends Modal {
    manager: IgnoreManager;
    content: string = '';

    constructor(app: App) {
        super(app);
        this.manager = new IgnoreManager(app);
    }

    async onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        
        this.modalEl.style.width = '600px';

        contentEl.createEl('h2', { text: t('modal_ignore_title') });
        contentEl.createEl('p', { text: t('modal_ignore_desc') });

        // Carrega conteúdo (Agora vai funcionar graças ao fix do Adapter)
        this.content = await this.manager.readIgnoreFile();

        const container = contentEl.createDiv();

        // --- ÁREA DE TEXTO ---
        const textArea = new TextAreaComponent(container);
        textArea.inputEl.style.width = '100%';
        textArea.inputEl.style.height = '300px';
        textArea.inputEl.style.fontFamily = 'monospace';
        textArea.setValue(this.content);
        
        textArea.onChange((value) => {
            this.content = value;
        });

        // Espaçamento
        container.createEl('br');

        // --- SUGESTÕES RETRÁTEIS (<details>) ---
        
        // Cria o container retrátil
        const details = container.createEl('details');
        // Define o estilo inicial (fechado)
        details.style.border = '1px solid var(--background-modifier-border)';
        details.style.borderRadius = '5px';
        details.style.padding = '10px';
        details.style.marginBottom = '10px';

        // O Título clicável
        const summary = details.createEl('summary', { text: t('header_ignore_templates') });
        summary.style.cursor = 'pointer';
        summary.style.fontWeight = 'bold';
        summary.style.marginBottom = '10px';
        summary.style.outline = 'none'; // Remove borda azul de foco

        // O container das opções (fica dentro do details)
        const suggestionsContainer = details.createDiv();

        const patterns = [
            { label: 'Workspace Config', rule: '.obsidian/workspace*' },
            { label: 'Installer Cache', rule: '.obsidian/installer.json' },
        ];

        patterns.forEach(p => {
            const settingDiv = suggestionsContainer.createDiv();
            // Usamos uma Setting simples sem borda para ficar compacto
            new Setting(settingDiv)
                .setName(p.label)
                .setDesc(p.rule)
                .addButton(btn => btn
                    .setButtonText(t('btn_add_ignore'))
                    .onClick(() => {
                        if (!this.content.includes(p.rule)) {
                            this.content = this.content.trim() + '\n' + p.rule;
                            textArea.setValue(this.content);
                        } else {
                            new Notice(t('notice_ignore_exists'));
                        }
                    }));
        });

        // --- RODAPÉ ---
        
        const footer = contentEl.createDiv({ 
            attr: { style: 'display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;' }
        });

        const btnSave = footer.createEl('button', { cls: 'mod-cta', text: t('btn_save_ignore') });
        btnSave.addEventListener('click', async () => {
            await this.manager.saveIgnoreFile(this.content);
            new Notice(t('notice_ignore_saved'));
            this.close();
        });
    }

    onClose() {
        this.contentEl.empty();
    }
}