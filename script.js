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
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let notes = JSON.parse(localStorage.getItem('notes')) || {};
    let currentSura = 1;
    let isPlaying = false;
    let synth = window.speechSynthesis;
    let currentFontSize = 16;

    // Contenu des 44 sourates avec un nombre variable de paragraphes
    const suraContents = {
        "1": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds",
            fr: "Préambule",
            paragraphs: {
                ar: [
                    "سورة الفاتحة هي أول سورة في القرآن الكريم وتُعتبر مفتاح القرآن. تُسمى أيضًا أم الكتاب لأنها تُلخص المبادئ الأساسية للإيمان والعبادة.",
                    "تتضمن هذه السورة الدعاء والتضرع إلى الله، حيث يطلب المؤمن الهداية إلى الصراط المستقيم."
                ],
                en: [
                    "Surah Al-Fatiha is the first chapter of the Quran and is considered the key to the Quran. It is also called the Mother of the Book as it encapsulates the fundamental principles of faith and worship.",
                    "This surah includes a supplication and plea to Allah, where the believer seeks guidance on the straight path."
                ],
                fr: [
                    "Loin de nous l’esprit de dénigrer, mais près de nous l’esprit d’éveiller. Ainsi donc, motivé par l’amour de la vérité et le respect que j’ai envers tous les non-musulmans, je m’adresse à vous (homme de Dieu, frère dans la foi), avec la sincère intention de ne me permettre, après avoir médité la parole de Dieu, de garder le minimum que j’ai acquis.",
                    "Accédez dans un voyage fascinant à travers les méandres de la spiritualité et découvrez la voie du salut qui vous attend. Ce livre est une invitation à la découverte de soi, à l’exploration de notre essence profonde et à la rencontre avec le divin qui sommeille en nous.",
                    "Laissez-vous porter par des analyses percutantes, des rubriques qui nourrissent l’esprit et des réflexions qui vont au-delà des frontières du temps et de l’espace. Préparez-vous à découvrir des perspectives nouvelles et à vous ouvrir à une réalité plus profonde et plus vraie.",
                    "Je vous suggère de vérifier chaque argument afin d’apprécier sa véracité. Je suis responsable de ce que j’écris, mais je ne suis point coupable de la compréhension que vous en faites. Néanmoins, je ne cesserai de vous amadouer, de vous éclaircir et de rendre les propos plus clairs.",
                    "Plongeons ensemble dans cette pantomime qui n’arrête de nous inviter. Hôtes serons-nous ? Écrivain serai-je ! Je noircis des pages pour orner le chemin et éclairer l’abysse.",
                    "Ouvrez votre esprit et laissez la vérité s’y installer. Ne consommez pas tout enseignement que l’on vous donne et puis on vous recommande de croire aveuglément.",
                    "La quintessence de ma sagacité scintille les anfractuosités de mon farfadet ahuri. Préparez-vous à être transporté vers des horizons ignorés, où la clarté, la paix et la félicité éternelle vous barguignent.",
                    "Avec respect et amour, Ahmed Said Aidara"
                ]
            }
        },
        "2": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Préface",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام والتشريعات.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws and regulations.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing piety and faith."
                ],
                fr: [
                    "Louange à Allah, le digne d’être adoré, je témoigne qu’il est la seule divinité. J’atteste que Mouhammad et Jésus-Christ sont des messagers de la part d’Allah.",
                    "Aujourd’hui, Mouhammad Haydara donne la chance aux croyants de défendre leur religion, assure la foi de plusieurs musulmans que l’islam est la vérité.",
                    "L’auteur ne s’est pas mis ici à une attaque, mais à une étude comparative, à un avertissement.",
                    "La première partie est consacrée à une révision des bases de l’islam et un petit coup d’œil au christianisme."
                ]
            }
        },
        "3": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant",
            paragraphs: {
                ar: [
                    "تعليق 1 على الآية 3 بالعربية.",
                    "تعليق 2 على الآية 3 بالعربية.",
                    "تعليق 3 على الآية 3 بالعربية."
                ],
                en: [
                    "Commentary 1 on verse 3 in English.",
                    "Commentary 2 on verse 3 in English.",
                    "Commentary 3 on verse 3 in English."
                ],
                fr: [
                    "Commentaire 1 sur le verset 3 en français.",
                    "Commentaire 2 sur le verset 3 en français.",
                    "Commentaire 3 sur le verset 3 en français."
                ]
            }
        },
        "4": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord, who created you from one soul...",
            fr: "Qui m’a créé et qui suis-je ?<br>Naissance d’une conscience",
            paragraphs: {
                ar: [
                    "تعليق 1 على الآية 4 بالعربية.",
                    "تعليق 2 على الآية 4 بالعربية."
                ],
                en: [
                    "Commentary 1 on verse 4 in English.",
                    "Commentary 2 on verse 4 in English."
                ],
                fr: [
                    "Commentaire 1 sur le verset 4 en français.",
                    "Commentaire 2 sur le verset 4 en français."
                ]
            }
        },
        "5": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...",
            paragraphs: {
                ar: [
                    "تعليق 1 على الآية 5 بالعربية.",
                    "تعليق 2 على الآية 5 بالعربية.",
                    "تعليق 3 على الآية 5 بالعربية.",
                    "تعليق 4 على الآية 5 بالعربية.",
                    "تعليق 5 على الآية 5 بالعربية."
                ],
                en: [
                    "Commentary 1 on verse 5 in English.",
                    "Commentary 2 on verse 5 in English.",
                    "Commentary 3 on verse 5 in English.",
                    "Commentary 4 on verse 5 in English.",
                    "Commentary 5 on verse 5 in English."
                ],
                fr: [
                    "Commentaire 1 sur le verset 5 en français.",
                    "Commentaire 2 sur le verset 5 en français.",
                    "Commentaire 3 sur le verset 5 en français.",
                    "Commentaire 4 sur le verset 5 en français.",
                    "Commentaire 5 sur le verset 5 en français."
                ]
            }
        },
        "6": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ ٱلَّذِى خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, who created the heavens and the earth...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Louange à Allah, qui a créé les cieux et la terre...",
            paragraphs: {
                ar: ["تعليق 1 على الآية 6 بالعربية."],
                en: ["Commentary 1 on verse 6 in English."],
                fr: ["Commentaire 1 sur le verset 6 en français."]
            }
        },
        "7": {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْمِيمْ ۚ صَدَقَ ٱللَّهُ ٱلْعَزِيزُ ٱلْحَكِيمُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim Sad. Allah has spoken the truth, the Exalted in Might, the Wise...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim Sad. Allah a dit la vérité, le Tout-Puissant, le Sage...",
            paragraphs: {
                ar: [
                    "تعليق 1 على الآية 7 بالعربية.",
                    "تعليق 2 على الآية 7 بالعربية."
                ],
                en: [
                    "Commentary 1 on verse 7 in English.",
                    "Commentary 2 on verse 7 in English."
                ],
                fr: [
                    "Commentaire 1 sur le verset 7 en français.",
                    "Commentaire 2 sur le verset 7 en français."
                ]
            }
        }
    };

    // Ajout des paragraphes pour les chapitres 8 à 44 avec nombres variables
    for (let i = 8; i <= 44; i++) {
        suraContents[i].paragraphs = {
            ar: Array.from({ length: (i % 5) + 1 }, (_, j) => `تعليق ${j + 1} على الآية ${i} بالعربية.`),
            en: Array.from({ length: (i % 5) + 1 }, (_, j) => `Commentary ${j + 1} on verse ${i} in English.`),
            fr: Array.from({ length: (i % 5) + 1 }, (_, j) => `Commentaire ${j + 1} sur le verset ${i} en français.`)
        };
    }

    // Navigation
    document.querySelector('.start-btn').addEventListener('click', () => {
        homePage.style.display = 'none';
        indexPage.style.display = 'block';
    });

    document.querySelectorAll('.index-page li').forEach(li => {
        li.addEventListener('click', () => {
            currentSura = parseInt(li.getAttribute('data-sura'));
            updateContent();
            indexPage.style.display = 'none';
            readingPage.style.display = 'block';
        });
    });

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

    document.querySelectorAll('.index-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            readingPage.style.display = 'none';
            indexPage.style.display = 'block';
            customizePanel.style.display = 'none';
        });
    });

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
        arabicText.style.fontSize = `${e.target.value}px`;
        textContent.style.fontSize = `${e.target.value}px`;
        paragraphsContent.style.fontSize = `${e.target.value}px`;
    });

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
            const textToRead = languageSelect.value === 'ar' ? arabicText.innerText : (textContent.innerText + ' ' + paragraphsContent.innerText);
            if (textToRead) {
                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.lang = languageSelect.value === 'ar' ? 'ar-SA' : (languageSelect.value === 'en' ? 'en-US' : 'fr-FR');
                synth.speak(utterance);
                isPlaying = true;
                voicePlayBtn.innerHTML = '<i class="fas fa-pause"></i> Lecture à haute voix';
                utterance.onend = () => {
                    isPlaying = false;
                    voicePlayBtn.innerHTML = '<i class="fas fa-play"></i> Lecture à haute voix';
                };
            }
        }
    });

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
        }
    });

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

    document.querySelector('.ai-btn').addEventListener('click', () => {
        alert('Assistant IA : Posez une question sur le livre (API Gemini à intégrer)');
    });

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
                                    allText[sura][lang].push({ text: para, lineIndex: -index - 1 });
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
                            if (result.lineIndex >= 0) {
                                const lines = suraContents[currentSura][lang].split('<br>');
                                targetElement.innerHTML = suraContents[currentSura][lang];
                                lines[result.lineIndex] = `<span style="background: yellow">${lines[result.lineIndex]}</span>`;
                                targetElement.innerHTML = lines.join('<br>');
                                targetElement.scrollTop = targetElement.scrollHeight * (result.lineIndex / lines.length);
                            } else {
                                const paraIndex = -result.lineIndex - 1;
                                const paragraphs = suraContents[currentSura].paragraphs[lang] || [];
                                const paragraphsHTML = paragraphs.map((para, idx) =>
                                    idx === paraIndex ? `<p style="background: yellow">${para}</p>` : `<p>${para}</p>`
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
    });

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

            const paragraphs = suraContents[currentSura].sur.sura.paragraphs[languageSelect.value] || []];
            const paragraphs = paragraphsHTML.map((para, => idx) => `<p>${para}</p>`).join('');
            if (paragraphsHTML.length > 0) {
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
    }

    // Initialisation
    updateContent();

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.key === 'PrintScreen') {
            e.preventDefault();
        }
    });

    document.addEventListener('contextmenu', (e) => e.preventDefault());
    });
});
