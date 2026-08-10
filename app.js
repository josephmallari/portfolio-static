// Render projects dynamically
function renderProjects() {
  const projectsList = document.querySelector('.projects ul');
  if (!projectsList) return;

  projectsList.innerHTML = projects.map((project, index) => {
    const projectId = `project-${project.name.toLowerCase().replace(/\s+/g, '-')}`;
    const hasVideo = project.hasVideo;
    const videoClass = hasVideo ? '' : 'project--no-video';

    // Build header content
    let headerContent = '';
    if (project.role) {
      headerContent += `<h3>${project.role}</h3>`;
    }
    if (project.agency) {
      headerContent += `<h3>Agency: <span>${project.agency}</span></h3>`;
    }
    if (project.technologies) {
      headerContent += `<h3>Technologies: <span>${project.technologies}</span></h3>`;
    }

    // Build project content
    let projectContent = '';
    if (hasVideo) {
      projectContent = `
        <div class="project__details">
          <div class="project__left">
            <video preload="none" muted playsinline loop autoplay aria-label="${project.name} project demo">
              <source data-src="${project.webmSrc}" type="video/webm">
              <source data-src="${project.videoSrc}" type="video/mp4">
            </video>
          </div>
          <div class="project__right">
            ${headerContent}
            ${project.description ? `<p>${project.description}</p>` : ''}
            ${project.url ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer">Visit site</a>` : ''}
          </div>
        </div>
      `;
    } else {
      const hasDescription = project.description && project.description.trim() !== '';
      projectContent = `
        <div class="project__header">
          ${headerContent}
        </div>
        <div class="project__info ${!hasDescription ? 'left-empty' : ''}">
          <div class="project__right">
            ${hasDescription ? `<p>${project.description}</p>` : ''}
            ${project.url ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer">Visit site</a>` : ''}
          </div>
        </div>
      `;
    }

    return `
      <li>
        <button class="project__text"
                aria-expanded="false"
                aria-controls="${projectId}"
                aria-label="Toggle ${project.name} project details">
          <span>${project.year}</span>${project.name}
        </button>
        <div class="project ${videoClass}" id="${projectId}">
          ${projectContent}
        </div>
      </li>
    `;
  }).join('');
}

// Handle project toggle with modern event delegation, lazy-loading video sources on first open
function initProjectToggles() {
  document.addEventListener('click', (e) => {
    const button = e.target.closest('.project__text');
    if (!button) return;

    const project = button.nextElementSibling;
    if (!project || !project.classList.contains('project')) return;

    const isExpanded = project.classList.toggle('project--show');
    button.setAttribute('aria-expanded', isExpanded);

    const video = project.querySelector('video');
    if (video && isExpanded && !video.dataset.loaded) {
      video.querySelectorAll('source[data-src]').forEach((source) => {
        source.src = source.dataset.src;
      });
      video.load();
      video.play().catch(() => {});
      video.dataset.loaded = 'true';
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initProjectToggles();
  });
} else {
  renderProjects();
  initProjectToggles();
}
