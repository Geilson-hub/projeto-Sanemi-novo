/**
 * Alterna entre as abas das temporadas na página de episódios.
 * @param {Event} evt Evento de clique
 * @param {string} nomeTemporada ID da div de conteúdo da temporada
 */
function abrirTemporada(evt, nomeTemporada) {
    const tabcontents = document.querySelectorAll('.tabcontent');
    tabcontents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });

    const tablinks = document.querySelectorAll('.tablink');
    tablinks.forEach(link => {
        link.classList.remove('active');
    });

    const targetTab = document.getElementById(nomeTemporada);
    if (targetTab) {
        targetTab.classList.add('active');
        targetTab.style.display = 'block';
    }

    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Garante exibição da aba ativa inicial
    const activeTab = document.querySelector('.tabcontent.active');
    if (activeTab) {
        activeTab.style.display = 'block';
    }

    // Gerencia a pausa automática entre todos os vídeos da página
    const todosOsVideos = document.querySelectorAll('.videos, .video-movie');
    todosOsVideos.forEach(videoQueComecouAtocar => {
        videoQueComecouAtocar.addEventListener('play', () => {
            todosOsVideos.forEach(outroVideo => {
                if (outroVideo !== videoQueComecouAtocar) {
                    outroVideo.pause();
                }
            });
        });
    });
});
