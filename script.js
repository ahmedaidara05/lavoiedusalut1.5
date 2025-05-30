// Configuration et initialisation de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAljojXHODwHjStePWkhthWLRzrw3pUslQ",
    authDomain: "la-voie-du-salut-36409.firebaseapp.com",
    projectId: "la-voie-du-salut-36409",
    storageBucket: "la-voie-du-salut-36409.firebasestorage.app",
    messagingSenderId: "61439310820",
    appId: "1:61439310820:web:52bfe8b862666ac13d25f1",
    measurementId: "G-G9S1ST8K3R"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log('Service Worker registered');
    }).catch(err => console.error('Service Worker registration failed:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('homePage');
    const indexPage = document.getElementById('indexPage');
    const readingPage = document.getElementById('readingPage');
    const settingsPanel = document.getElementById('settingsPanel');
    const favoritesPage = document.getElementById('favoritesPage');
    const notesPage = document.getElementById('notesPage');
    const arabicText = document.getElementById('arabicText');
    const textContent = document.getElementById('textContent');
    const paragraphsContent = document.getElementById('paragraphsContent');
    const suraTitle = document.getElementById('suraTitle');
    const languageSelect = document.getElementById('languageSelect');
    const themeSelect = document.getElementById('themeSelect');
    const fontSelect = document.getElementById('fontSelect');
    const fontSize = document.getElementById('fontSize');
    const favoritesList = document.getElementById('favoritesList');
    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');
    const customizePanel = document.getElementById('customizePanel');
    const favoriteBtn = document.querySelector('.favorite-btn');
    const voicePlayBtn = document.querySelector('.customize-panel .voice-play-btn');
    const startBtn = document.querySelector('.start-btn');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let notes = JSON.parse(localStorage.getItem('notes')) || {};
    let currentSura = 1;
    let isPlaying = false;
    let synth = window.speechSynthesis;
    let currentFontSize = 16;

    // Contenu des 44 sourates avec 3 paragraphes ou plus
    const suraContents = {
        "1": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds",
            fr: "Préambule",
            paragraphs: {
                ar: [
                    "سورة الفاتحة هي أول سورة في القرآن الكريم وتُعتبر مفتاح القرآن. تُسمى أيضًا أم الكتاب.",
                    "تتضمن هذه السورة الدعاء والتضرع إلى الله، حيث يطلب المؤمن الهداية إلى الصراط المستقيم.",
                    "تُعتبر ركيزة أساسية في الصلاة اليومية للمسلمين."
                ],
                en: [
                    "Surah Al-Fatiha is the first chapter of the Quran and is considered the key to the Quran.",
                    "This surah includes a supplication and plea to Allah, where the believer seeks guidance.",
                    "It is a cornerstone of daily prayers for Muslims."
                ],
                fr: [
                    "Loin de nous l’esprit de dénigrer, mais près de nous l’esprit d’éveiller. Ainsi donc, motivé par l’amour de la vérité.",
                    "Accédez dans un voyage fascinant à travers les méandres de la spiritualité et découvrez la voie du salut.",
                    "Laissez-vous porter par des analyses percutantes, des rubriques qui nourrissent l’esprit.",
                    "Je vous suggère de vérifier chaque argument afin d’apprécier sa véracité.",
                    "Plongeons ensemble dans cette pantomime qui n’arrête de nous inviter."
                ]
            }
        },
        "2": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Préface",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان.",
                    "تتضمن قصص الأنبياء وتشريعات تنظم حياة المسلمين.",
                    "تُركز على الإيمان بالغيب كجزء أساسي من العقيدة."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing piety.",
                    "It includes stories of the prophets and regulations for Muslim life.",
                    "It focuses on faith in the unseen as a core part of belief."
                ],
                fr: [
                    "Louange à Allah, le digne d’être adoré, je témoigne qu’il est la seule divinité.",
                    "Aujourd’hui, Mouhammad Haydara donne la chance aux croyants de défendre leur religion.",
                    "L’auteur ne s’est pas mis ici à une attaque, mais à une étude comparative.",
                    "La première partie est consacrée à une révision des bases de l’islam."
                ]
            }
        },
        "3": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim.",
            paragraphs: {
                ar: [
                    "تعليق 1: هذه السورة تؤكد على وحدانية الله وسلطانه.",
                    "تعليق 2: تبين أهمية الإيمان بالله كالقيوم الحي.",
                    "تعليق 3: تتضمن توجيهات للمؤمنين للثبات على الدين."
                ],
                en: [
                    "Commentary 1: This surah emphasizes the oneness of Allah and His authority.",
                    "Commentary 2: It highlights the importance of faith in Allah as the Ever-Living.",
                    "Commentary 3: It includes guidance for believers to remain steadfast."
                ],
                fr: [
                    "Commentaire 1: Cette sourate met en avant l’unicité d’Allah et son autorité.",
                    "Commentaire 2: Elle souligne l’importance de la foi en Allah, le Vivant.",
                    "Commentaire 3: Elle contient des directives pour les croyants."
                ]
            }
        },
        "4": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord",
            fr: "Qui m’a créé et qui suis-je ?<br>Naissance d’une conscience",
            paragraphs: {
                ar: [
                    "تعليق 1: دعوة للناس لتقوى الله وتذكر خالقهم.",
                    "تعليق 2: السورة تتحدث عن الخلق والمسؤولية.",
                    "تعليق 3: تؤكد على أهمية الوعي الروحي.",
                    "تعليق 4: تشجع على التفكير في الغاية من الحياة."
                ],
                en: [
                    "Commentary 1: A call for people to fear Allah and remember their Creator.",
                    "Commentary 2: The surah discusses creation and responsibility.",
                    "Commentary 3: It emphasizes the importance of spiritual awareness.",
                    "Commentary 4: Encourages reflection on the purpose of life."
                ],
                fr: [
                    "Commentaire 1: Un appel aux gens à craindre Allah et à se souvenir de leur Créateur.",
                    "Commentaire 2: La sourate parle de la création et de la responsabilité.",
                    "Commentaire 3: Elle met l’accent sur l’importance de la conscience spirituelle.",
                    "Commentaire 4: Encourage la réflexion sur le but de la vie."
                ]
            }
        },
        "5": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru",
            paragraphs: {
                ar: [
                    "تعليق 1: دعوة المؤمنين للوفاء بالعهود والعقود.",
                    "تعليق 2: السورة تؤكد على الأخلاق في التعاملات.",
                    "تعليق 3: تشجع على الصدق والأمانة."
                ],
                en: [
                    "Commentary 1: A call for believers to fulfill their covenants and contracts.",
                    "Commentary 2: The surah emphasizes ethics in dealings.",
                    "Commentary 3: Encourages honesty and trustworthiness."
                ],
                fr: [
                    "Commentaire 1: Un appel aux croyants à respecter leurs engagements et contrats.",
                    "Commentaire 2: La sourate met l’accent sur l’éthique dans les transactions.",
                    "Commentaire 3: Encourage l’honnêteté et la fiabilité."
                ]
            }
        }
    };

    // Compléter les chapitres 6 à 44 avec 3 paragraphes ou plus
    for (let i = 6; i <= 44; i++) {
        const paraCount = 3 + (i % 3); // 3 à 5 paragraphes
        suraContents[i] = {
            ar: `بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>آية ${i}`,
            en: `In the name of Allah, the Most Gracious, the Most Merciful<br>Verse ${i}`,
            fr: `Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Verset ${i}`,
            paragraphs: {
                ar: Array.from({ length: paraCount }, (_, j) => `تعليق ${j + 1} على الآية ${i} بالعربية.`),
                en: Array.from({ length: paraCount }, (_, j) => `Commentary ${j + 1} on verse ${i} in English.`),
                fr: Array.from({ length: paraCount }, (_, j) => `Commentaire ${j + 1} sur le verset ${i} en français.`)
            }
        };
    }

    // Bouton Commencer la lecture
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            homePage.style.display = 'none';
            indexPage.style.display = 'block';
            console.log('Bouton Commencer la lecture cliqué');
        });
    } else {
        console.error('Erreur : .start-btn introuvable dans le DOM');
    }

    // Navigation via l'index
    document.querySelectorAll('.index-page li').forEach(li => {
        li.addEventListener('click', () => {
            currentSura = parseInt(li.getAttribute('data-sura'));
            updateContent();
            indexPage.style.display = 'none';
            readingPage.style.display = 'block';
        });
    });

    // Boutons de fermeture
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (indexPage.style.display !== 'none') {
                indexPage.style.display = 'none';
                homePage.style.display = 'block';
            } else if (settingsPanel.style.display !== 'none') {
                settingsPanel.style.display = 'none';
                readingPage.style.display = 'block';
            } else if (favoritesPage.style.display !== 'none') {
                favoritesPage.style.display = 'none';
                readingPage.style.display = 'block';
            } else if (notesPage.style.display !== 'none') {
                notesPage.style.display = 'none';
                readingPage.style.display = 'block';
            }
        });
    });

    // Retour à l'index
    document.querySelectorAll('.index-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            readingPage.style.display = 'none';
            indexPage.style.display = 'block';
            customizePanel.style.display = 'none';
        });
    });

    // Navigation Précédent/Suivant
    document.querySelector('.prev-btn').addEventListener('click', () => {
        if (currentSura > 1) {
            currentSura--;
            updateContent();
        }
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        if (currentSura < 44) {
            currentSura++;
            updateContent();
        }
    });

    // Paramètres
    document.querySelector('.settings-btn').addEventListener('click', () => {
        readingPage.style.display = 'none';
        settingsPanel.style.display = 'block';
    });

    languageSelect.addEventListener('change', () => {
        updateContent();
    });

    themeSelect.addEventListener('change', (e) => {
        document.body.className = e.target.value === 'dark' ? 'dark' : '';
    });

    fontSelect.addEventListener('change', (e) => {
        arabicText.style.fontFamily = e.target.value;
        textContent.style.fontFamily = e.target.value;
        paragraphsContent.style.fontFamily = e.target.value;
    });

    fontSize.addEventListener('input', (e) => {
        currentFontSize = e.target.value;
        arabicText.style.fontSize = `${currentFontSize}px`;
        textContent.style.fontSize = `${currentFontSize}px`;
        paragraphsContent.style.fontSize = `${currentFontSize}px`;
    });

    // Favoris
    favoriteBtn.addEventListener('click', () => {
        if (!favorites.includes(currentSura)) {
            favorites.push(currentSura);
            favoriteBtn.textContent = '★';
        } else {
            favorites = favorites.filter(sura => sura !== currentSura);
            favoriteBtn.textContent = '☆';
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavorites();
    });

    document.querySelector('.favorites-btn').addEventListener('click', () => {
        favoritesPage.style.display = favoritesPage.style.display === 'none' ? 'block' : 'none';
        readingPage.style.display = favoritesPage.style.display === 'block' ? 'none' : 'block';
        updateFavorites();
    });

    function updateFavorites() {
        favoritesList.innerHTML = '';
        favorites.forEach(sura => {
            if (sura >= 1 && sura <= 44 && suraContents[sura]) {
                const li = document.createElement('li');
                li.innerHTML = `<span class="sura-number">${sura}</span> La Voie du Salut ${sura}<br>Nombre de ${suraContents[sura].ar.split('<br>').length - 1} <i class="fas fa-mosque"></i>`;
                li.addEventListener('click', () => {
                    currentSura = sura;
                    updateContent();
                    favoritesPage.style.display = 'none';
                    readingPage.style.display = 'block';
                });
                favoritesList.appendChild(li);
            }
        });
    }

    updateFavorites();

    // Personnalisation
    document.querySelector('.customize-btn').addEventListener('click', () => {
        customizePanel.style.display = customizePanel.style.display === 'none' ? 'flex' : 'none';
    });

    document.querySelector('.close-customize-btn').addEventListener('click', () => {
        customizePanel.style.display = 'none';
    });

    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = document.getElementById('readingContent');
            const color = btn.getAttribute('data-color');
            content.style.backgroundColor = color;
            document.body.style.backgroundColor = color;
        });
    });

    document.querySelector('.zoom-in-btn').addEventListener('click', () => {
        currentFontSize = Math.min(currentFontSize + 2, 30);
        arabicText.style.fontSize = `${currentFontSize}px`;
        textContent.style.fontSize = `${currentFontSize}px`;
        paragraphsContent.style.fontSize = `${currentFontSize}px`;
    });

    document.querySelector('.zoom-out-btn').addEventListener('click', () => {
        currentFontSize = Math.max(currentFontSize - 2, 12);
        arabicText.style.fontSize = `${currentFontSize}px`;
        textContent.style.fontSize = `${currentFontSize}px`;
        paragraphsContent.style.fontSize = `${currentFontSize}px`;
    });

    voicePlayBtn.addEventListener('click', () => {
        if (isPlaying) {
            synth.cancel();
            isPlaying = false;
            voicePlayBtn.innerHTML = '<i class="fas fa-play"></i> Lecture à haute voix';
        } else {
            const textToRead = languageSelect.value === 'ar' ? arabicText.innerText : (textContent.innerText + ' ' + paragraphsContent.innerHTML.replace(/<[^>]+>/g, '')));
            if (textToRead) {
                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.lang = languageSelect.value === 'ar' ? 'ar-SA' : (languageSelect.value === 'en' ? 'en-US' : 'fr-FR');
                synth.speak(utterance);
                isPlaying = true;
                voicePlayBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
                utterance.onend = () => {
                    isPlaying = false;
                    voicePlayBtn.innerHTML = '<i class="fas fa-play"></i> Lecture à haute voix';
                };
            }
        }
    });

    // Notes
    document.querySelector('.note-btn').addEventListener('click', () => {
        readingPage.style.display = 'none';
        notesPage.style.display = 'block';
        updateNotes();
    });

    document.querySelector('.add-category-btn').addEventListener('click', () => {
        const categoryName = document.getElementById('newCategory').value.trim();
        if (categoryName) {
            if (!notes[categoryName]) {
                notes[categoryName] = '';
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            updateNotes();
            document.getElementById('newCategory').value = '';
        });
    }

    function updateNotes() {
        const categoriesList = document.getElementById('categoriesList');
        categoriesList.innerHTML = '';
        for (const category in notes) {
            const div = document.createElement('div');
            div.className = 'category';
            div.innerHTML = `
                <h3>${category}</h3>
                <textarea>${notes[category]}</textarea>
            `;
            div.querySelector('textarea').addEventListener('input', (e) => {
                notes[category] = e.target.value;
                localStorage.setItem('notes', JSON.stringify(notes));
            });
            categoriesList.appendChild(div);
        }
    }

    // Assistant IA
    document.querySelector('.ai-btn').addEventListener('click', () => {
        alert('Assistant IA : Posez une question sur le livre (API Gemini à intégrer)');
    });

    // Recherche intelligente
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim().toLowerCase();
        searchResults.style.display = searchTerm ? 'block' : 'none';
        searchResults.innerHTML = '';

        if (searchTerm) {
            const allText = {};
            for (let sura = 1; sura <= 44; sura++) {
                ['ar', 'en', 'fr'].forEach(lang => {
                    if (suraContents[sura] && suraContents[sura][lang]) {
                        const lines = suraContents[sura][lang].split('<br>');
                        lines.forEach((line, index) => {
                            if (line.toLowerCase().includes(searchTerm)) {
                                if (!allText[sura]) allText[sura] = {};
                                if (!allText[sura][lang]) allText[sura][lang] = [];
                                allText[sura][lang].push({ text: line, lineIndex: index });
                            }
                        });
                        if (suraContents[sura].paragraphs && suraContents[sura].paragraphs[lang]) {
                            suraContents[sura].paragraphs[lang].forEach((para, index) => {
                                if (para.toLowerCase().includes(searchTerm)) {
                                    if (!allText[sura]) allText[sura] = {};
                                    if (!allText[sura][lang]) allText[sura][lang] = [];
                                    allText[sura][lang].push({ text: para, paraIndex: index });
                                }
                            });
                        }
                    }
                });
            }

            for (let sura in allText) {
                for (let lang in allText[sura]) {
                    allText[sura][lang].forEach(result => {
                        const div = document.createElement('div');
                        div.className = 'result-item';
                        div.innerHTML = `<strong>La Voie du Salut ${sura} (${lang.toUpperCase()})</strong><br>${result.text}`;
                        div.addEventListener('click', () => {
                            currentSura = parseInt(sura);
                            languageSelect.value = lang;
                            updateContent();
                            const targetElement = lang === 'ar' ? arabicText : textContent;
                            if (result.lineIndex !== undefined) {
                                const lines = suraContents[currentSura][lang].split('<br>');
                                targetElement.innerHTML = suraContents[currentSura][lang];
                                lines[result.lineIndex] = `<span style="background: yellow">${lines[result.lineIndex]}</span>`;
                                targetElement.innerHTML = lines.join('<br>');
                                targetElement.scrollTop = targetElement.scrollHeight * (result.lineIndex / lines.length);
                            } else if (result.paraIndex !== undefined) {
                                const paragraphs = suraContents[currentSura].paragraphs[lang] || [];
                                const paragraphsHTML = paragraphs.map((para, idx) =>
                                    idx === result.paraIndex ? `<p style="background: yellow">${para}</p>` : `<p>${para}</p>`
                                ).join('');
                                paragraphsContent.innerHTML = `<h3>Commentaires</h3>${paragraphsHTML}`;
                            }
                            searchResults.style.display = 'none';
                            searchBar.value = '';
                        });
                        searchResults.appendChild(div);
                    });
                }
            }
        }
    });

    // Connexion/Inscription
    document.querySelectorAll('.auth-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const username = btn.parentElement.querySelector('input[type="text"]').value;
            const password = btn.parentElement.querySelector('input[type="password"]').value;
            if (btn.textContent === 'Se connecter') {
                auth.signInWithEmailAndPassword(username, password)
                    .then((userCredential) => {
                        alert(`Connexion réussie avec ${username}`);
                    })
                    .catch((error) => {
                        alert('Erreur de connexion : ' + error.message);
                    });
            } else {
                auth.createUserWithEmailAndPassword(username, password)
                    .then((userCredential) => {
                        alert(`Inscription réussie pour ${username}`);
                    })
                    .catch((error) => {
                        alert('Erreur d\'inscription : ' + error.message);
                    });
            }
        });
    // Mise à jour du contenu
    function updateContent() {
        const content = suraContents[currentSura] && suraContents[currentSura][languageSelect.value];
        suraTitle.textContent = `La Voie du Salut ${currentSura}`;
        paragraphsContent.innerHTML = '';

        if (content) {
            const lines = content.split('<br>');
            const bismillahLine = lines[0];
            const rest = lines.slice(1).join('<br>');

            if (languageSelect.value === 'ar') {
                arabicText.innerHTML = `<span class="bismillah">${bismillahLine}</span><br>${rest}`;
                textContent.style.display = 'none';
                arabicText.style.display = 'block';
            } else {
                textContent.innerHTML = `<span class="bismillah">${bismillahLine}</span><br>${rest}`;
                arabicText.style.display = 'none';
                textContent.style.display = 'block';
            }

            // Afficher les paragraphes (3 ou plus)
            const paragraphs = suraContents[currentSura].paragraphs[languageSelect.value] || [];
            if (paragraphs.length > 0) {
                const paragraphsHTML = paragraphs.map(para => `<p>${para}</p>`).join('');
                paragraphsContent.innerHTML = `<h3>Commentaires</h3>${paragraphsHTML}`;
            }

            favoriteBtn.textContent = favorites.includes(currentSura) ? '★' : '☆';
        } else {
            arabicText.innerHTML = 'Contenu non disponible';
            textContent.innerHTML = 'Content not available';
            paragraphsContent.innerHTML = '';
            arabicText.style.display = 'block';
            textContent.style.display = 'none';
        }
    }

    // Initialisation
    updateContent();

    // Sécurité anti-copie
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.key === 'PrintScreen') {
            e.preventDefault();
            alert('Copier ou capturer interdit');
        }
    });

    document.addEventListener('contextmenu', (e) => e.preventDefault());
});
