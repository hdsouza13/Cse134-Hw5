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

// Handle "Load Local" and "Load Remote" functionality
document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    const loadLocalBtn = document.getElementById('load-local-btn');
    const loadRemoteBtn = document.getElementById('load-remote-btn');

    // Example data to store in localStorage
    const localData = [
        {
            project: "Regency Young Scholar Science Program",
            imgSrc: "../IMG_0021.jpg",
            imgAlt: "Regency group image",
            description: "The Regency Young Scholar Science Program aims to bridge the gap in science education for children who may not have access to hands-on learning experiences. Through engaging experiments and activities, the program introduces fundamental scientific principles in an accessible and fun way. By fostering curiosity and exploration, it not only enhances scientific knowledge but also nurtures critical thinking and problem-solving skills from an early age. The program strives to inspire a lifelong passion for science, encouraging children to see the world through an analytical lens and empowering them to become future innovators and leaders in their communities. I was one of the individuals responsible for teaching the kids, guiding them through experiments and activities to help them develop a deeper understanding of scientific concepts.",
            link: "https://childcarecenter.us/provider_detail/young_scholars_academy_draper_ut"
        },
        {
            project: "Website Project",
            imgSrc: "../weblogo.png",
            imgAlt: "Web page logo",
            description: "This video showcases a preliminary design of the website project that I participated in. My group and I created a DevJournal website based on the design we developed. The website was built to provide a structured and engaging platform for developers to document their projects, share insights, and collaborate. From conceptualizing the user interface in Figma to implementing the final web application, our team worked together to bring the design to life, ensuring both functionality and an intuitive user experience.",
            link: "../webvideo.html"
        },
        {
            project: "Nasa California Space Grant Consortium",
            imgSrc: "../nasalogo.png",
            imgAlt: "Nasa logo",
            description: "The Lunar Lava Tube Exploration challenge tasks teams with exploring a lunar lava tube, assessing its potential for human habitation. The challenge involves building a rover and developing programs that enable the rover to navigate a model lunar lava tube. I was responsible for the coding aspect of this project, implementing the navigation programs using Arduino to control the rover's movement and decision-making in the simulated environment.",
            link: "https://casgc.ucsd.edu/"
        },
        {
            project: "OCC Caculus Tutor",
            imgSrc: "../occlogo.png",
            imgAlt: "OCC logo",
            description: "Tutored students in Calculus 1, 2, and 3 at Orange Coast College, supporting academic success through personalized instruction and targeted problem-solving strategies.",
            link: "https://orangecoastcollege.edu/services-support/tutoring-services/"
        },
        {
            project: "Tennis Assistant",
            imgSrc: "../tennislogo.png",
            imgAlt: "Tennis logo",
            description: "Assisted my coach in teaching a group of 10 children from a community to play tennis. Enhanced player performance by providing individualized coaching and targeted training drills.",
            link: "https://www.clubepitangueiras.com.br/tenis.html"
        }
    ];

    localStorage.setItem('projects', JSON.stringify(localData));

    function createProjectCards(data) {
        projectsContainer.innerHTML = ''; 
        data.forEach(item => {
            const card = document.createElement('project-card');
            card.setAttribute('project', item.project);
            card.setAttribute('img-src', item.imgSrc);
            card.setAttribute('img-alt', item.imgAlt);
            card.setAttribute('description', item.description);
            card.setAttribute('link', item.link);
            projectsContainer.appendChild(card);
        });
    }

    loadLocalBtn.addEventListener('click', () => {
        const data = JSON.parse(localStorage.getItem('projects'));
        if (data) {
            createProjectCards(data);
        } else {
            alert('No data found in localStorage.');
        }
    });

    loadRemoteBtn.addEventListener('click', () => {
        const remoteUrl =  'https://my-json-server.typicode.com/hdsouza13/Cse134-Hw5' 

        fetch(remoteUrl)
            .then(response => response.json())
            .then(data => {
                createProjectCards(data.record || data); 
            })
            .catch(error => {
                console.error('Error fetching remote data:', error);
                alert('Failed to load remote data.');
            });
    });
});
