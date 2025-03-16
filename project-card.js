class ProjectCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: var(--card-width, 320px);
                background: var(--card-bg, linear-gradient(135deg, #ffffff, #f9f9f9));
                border-radius: var(--card-border-radius, 12px);
                box-shadow: var(--card-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
                padding: var(--card-padding, 20px);
                transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                border: 1px solid var(--card-border-color, rgba(0, 0, 0, 0.1));
            }

            :host(:hover) {
                transform: scale(1.05);
                box-shadow: var(--card-shadow-hover, 0 8px 16px rgba(0, 0, 0, 0.2));
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }

            h2 {
                font-size: var(--card-title-size, 1.5em);
                color: var(--card-title-color, #222);
                margin: 0;
                font-weight: 600;
                letter-spacing: -0.5px;
            }

            .logo {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid var(--card-logo-border, rgba(0, 0, 0, 0));
            }

            p {
                font-size: var(--card-text-size, 1em);
                color: var(--card-text-color, #555);
                margin: 10px 0;
                line-height: 1.5;
            }

            a {
                text-decoration: none;
                color: var(--card-link-color, #007BFF);
                font-weight: 600;
                display: inline-block;
                margin-top: 10px;
                transition: color 0.2s ease-in-out;
            }

            a:hover {
                color: var(--card-link-hover-color, #0056b3);
                text-decoration: underline;
            }
            </style>
            <div class="header">
            <h2></h2>
            <picture>
                <img class="logo" src="" alt="">
            </picture>
            </div>
            <p></p>
            <a href="#" target="_blank">Learn More</a>
        `;
    }

    static get observedAttributes() {
        return ['project', 'img-src', 'description', 'link'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'project') this.shadowRoot.querySelector('h2').textContent = newValue;
        if (name === 'img-src') {
            this.shadowRoot.querySelector('img').src = newValue;
            this.shadowRoot.querySelector('img').alt = `Image of ${newValue} logo`;
        }
        if (name === 'description') this.shadowRoot.querySelector('p').textContent = newValue;
        if (name === 'link') this.shadowRoot.querySelector('a').href = newValue;
    }
}

customElements.define('project-card', ProjectCard);
