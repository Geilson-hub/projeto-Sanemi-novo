(function () {
    async function isLoggedIn() {
        if (typeof netlifyIdentity !== 'undefined') {
            const user = await netlifyIdentity.currentUser();
            if (user) {
                return true;
            }
        }
        return localStorage.getItem('inscrito') === 'true';
    }

    isLoggedIn().then(function (inscrito) {
        const downloadLinks = document.querySelectorAll('.download-link');
        const downloadSections = document.querySelectorAll('.download-section');

        downloadLinks.forEach(function (link) {
            if (inscrito) {
                link.style.display = 'inline-flex';
            } else {
                link.style.display = 'none';
            }
        });

        downloadSections.forEach(function (section) {
            if (!inscrito) {
                var placeholder = document.createElement('p');
                placeholder.className = 'download-placeholder';
                placeholder.textContent = '🔒Faça sua inscrição para ter acesso ao download deste episódio.';
                section.appendChild(placeholder);
            }
        });

        var episodios = document.querySelectorAll('.episódio');

        episodios.forEach(function (ep) {
            var epNum = parseInt(ep.getAttribute('data-epnum'), 10);
            if (!inscrito && epNum >= 6) {
                var videoItem = ep.querySelector('.video-item');
                var videos = ep.querySelectorAll('.videos');

                videos.forEach(function (video) {
                    video.setAttribute('controlsList', 'nodownload');
                    video.removeAttribute('controls');
                    video.style.display = 'none';
                });

                if (videoItem && !ep.querySelector('.video-lock-placeholder')) {
                    var lockDiv = document.createElement('div');
                    lockDiv.className = 'video-lock-placeholder';
                    lockDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ec0c0c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg><p>Faça sua inscrição para assistir a este episódio.</p><a href="inscrever-se.html" class="butao2" style="margin-top:12px;display:inline-block;text-decoration:none;">Inscrever-se</a>';
                    videoItem.style.display = 'none';
                    videoItem.parentNode.parentNode.insertBefore(lockDiv, videoItem.parentNode.nextSibling);
                }
            } else if (inscrito && epNum >= 6) {
                var videos2 = ep.querySelectorAll('.videos');
                videos2.forEach(function (video) {
                    video.removeAttribute('controlsList');
                    video.setAttribute('controls', '');
                    video.style.display = '';
                });
                var videoItem2 = ep.querySelector('.video-item');
                var lockDiv2 = ep.querySelector('.video-lock-placeholder');
                if (videoItem2) videoItem2.style.display = '';
                if (lockDiv2) lockDiv2.style.display = 'none';
            }
        });
    });
})();