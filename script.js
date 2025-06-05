// script.js
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
    navigator.serviceWorker.register('service-worker.js').then(() => {
        console.log('Service Worker enregistré');
    }).catch(err => console.error('Erreur d’enregistrement du Service Worker :', err));
}

document.addEventListener('DOMContentLoaded', async () => {
    // Importer les réponses du chatbot
    const { default: chatbotResponses } = await import('./chatbotResponses.js');

    // Sélection des éléments DOM
    const homePage = document.getElementById('homePage');
    const indexPage = document.getElementById('index-page');
    const readingPage = document.getElementById('readingPage');
    const settingsPanel = document.getElementById('settingsPanel');
    const favoritesPage = document.getElementById('favoritesPage');
    const notesPage = document.getElementById('notes-page');
    const arabicText = document.getElementById('arabicText');
    const textContent = document.getElementById('textContent');
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
    const synth = window.speechSynthesis;
    let currentFontSize = 16;
    let isChatOpen = false;

    // Contenu des chapitres
    const suraContents = {
        1: {
            ar: "<b>المُقَدِّمَة</b><br>بَعِيدًا عَنْ رُوحِ التَّنَقُّصِ وَقَرِيْبًا مِنْ رُوحِ الإِيقَاظِ، أُخَاطِبُكَ يَا رَجُلَ اللهِ، يَا أَخِي فِي الإِيمَانِ، بِدَافِعِ حُبِّ الحَقِيقَةِ وَالاحْتِرَامِ لِغَيْرِ المُسْلِمِينَ، لِأُشَارِكَ مَا حَصَلْتُ عَلَيْهِ بَعْدَ التَّأَمُّلِ فِي كَلِمَةِ اللهِ. مَكْتُوبٌ فِي يُوشَعَ: «لاَ يَبْرَحْ سِفْرُ الشَّرِيعَةِ هَذَا مِنْ فَمِكَ، بَلْ تَهَجَّ بِهِ نَهَارًا وَلَيْلًا، لِتَعْمَلَ بِمَا فِيهِ، فَتَنْجَحَ». قَالَ اللهُ فِي القُرْآنِ: ﴿وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِنْ مُدَّكِرٍ﴾ (سُورَةُ القَمَرِ، 54:17)<br><br>يَدْعُوكَ هَذَا الكِتَابُ لِرِحْلَةٍ رُوحَانِيَّةٍ سَاحِرَةٍ لِاكْتِشَافِ طَرِيقِ النَّجَاةِ، وَاسْتِكْشَافِ جَوْهَرِكَ العَمِيقِ، وَلِقَاءِ الإِلَهِيِّ فِيكَ، مِنْ خِلَالِ تَحْلِيلَاتٍ مُؤَثِّرَةٍ وَتَأَمُّلَاتٍ خَالِدَةٍ.<br><br>دَعْ حِكْمَةَ الإِسْلَامِ وَتَعَالِيمَهُ الغَنِيَّةَ وَنُورَهُ يَهْدِيكَ نَحْوَ السَّلَامِ وَالتَّحْرِيرِ.<br><br>أَدْعُوكَ لِلْتَحَقُّقِ مِنْ كُلِّ حُجَّةٍ لِتَقْدِيرِ صِدْقِهَا، فَأَنَا مَسْؤُولٌ عَمَّا أَكْتُبُ، لَا عَنْ فَهْمِكَ. اغْمُرْ نَفْسَكَ فِي هَذِهِ الرِّحْلَةِ الرُّوحَانِيَّةِ، اقْرَأْ لِتَفْهَمَ، لَا لِتَمُرَّ فَقَطْ، كَمَا قَالَ عِيسَى: «لَا تَكُنْ كَالفَرَسِ أَوِ البَغْلِ بِلَا فَهْمٍ» (مَزْمُورٌ 32:9). كَانَ اليَهُودُ يَفْحَصُونَ الكُتُبَ المُقَدَّسَةَ لِيَتَحَقَّقُوا مِنَ الحَقِيقَةِ (الأَعْمَالُ)، وَيُوصِي تَسَالُونِيكِي الأَوَّلُ: «لَا تُطْفِئُوا الرُّوحَ، افْحَصُوا كُلَّ شَيْءٍ وَتَمَسَّكُوا بِالصَّالِحِ» (تَسَالُونِيكِي الأَوَّلُ 5:19-21).<br><br>سَوَاءٌ كُنْتَ تَبْحَثُ عَنْ إِجَابَاتٍ أَوْ اتِّصَالٍ أَعْمَقَ، سَيَكُونُ هَذَا الكِتَابُ رَفِيقَكَ الأَمِينَ فِي هَذِهِ الرِّحْلَةِ المُقَدَّسَةِ، يَقُودُكَ إِلَى الوُضُوحِ وَالسَّلَامِ وَالسَّعَادَةِ الأَبَدِيَّةِ.<br><br>مَعَ الاحْتِرَامِ وَالمَحَبَّةِ<br><br>أَحْمَدُ سَعِيدُ عَيْدَارَا<br>",
            en: "<b>Preamble</b><br>Far from the spirit of denigration, but close to the spirit of awakening, I address you, man of God, brother in faith, motivated by the love of truth and respect for all non-Muslims, to share what I’ve gained after meditating on God’s word. It is written in Joshua: “This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night, so that you may do all that is written in it, for then you will prosper.” Allah says in the Qur’an: “And We have certainly made the Qur’an easy for remembrance, so is there any who will remember?” (Al-Qamar, 54:17, Sahih International)<br><br>This book invites you to a fascinating spiritual journey to discover the path of salvation, explore your deepest essence, and meet the divine within you, through impactful analyses and timeless reflections.<br><br>Let the wisdom of Islam, its rich teachings, and its light guide you toward peace and liberation.<br><br>I urge you to verify each argument to appreciate its truth, for I am responsible for what I write, not for your understanding. Dive into this spiritual quest, read to understand, not just to pass, as Jesus said: “Do not be like the horse or mule, which have no understanding” (Psalm 32:9, NIV). The Jews examined the Scriptures to verify the truth (Acts), and 1 Thessalonians advises: “Do not quench the Spirit, test everything, hold fast what is good” (1 Thessalonians 5:19-21, NIV).<br><br>Whether seeking answers or a deeper connection, this book will be your faithful companion in this sacred quest, leading you to clarity, peace, and eternal bliss.<br><br>With respect and love<br><br>Ahmed Said Aidara<br>",
            fr: "<b>Préambule</b><br>Loin de nous l’esprit de dénigrer, mais près de nous l’esprit d’éveiller. Ainsi donc, motivé par l’amour de la vérité et le respect que j’ai envers tous les non-musulmans, je m’adresse à vous (homme de Dieu, frère dans la foi), avec la sincère intention de ne me permettre, après avoir médité la parole de Dieu, de garder le minimum que j’ai acquis. Il est écrit dans le livre de Josué ; Que ce livre de la loi ne s’éloigne pas de ta bouche, et médite-le jour et nuit, afin que tu prennes garde à faire selon tout ce qui y est écrit ; car alors, tu feras réussir tes voies, et alors, tu prospéreras. Dieu dit dans le Coran ; Et Nous avons rendu le Coran facile à retenir. L’un de vous souhaite-t-il apprendre ?<br><br>Accédez dans un voyage fascinant à travers les méandres de la spiritualité et découvrez la voie du salut qui vous attend. Ce livre est une invitation à la découverte de soi, à l’exploration de notre essence profonde et à la rencontre avec le divin qui sommeille en nous. Contemplez la voie du salut, une voie parsemée d’émerveillement, de transformation et de libération.<br><br>Laissez-vous porter par des analyses percutantes, des rubriques qui nourrissent l’esprit et des réflexions qui vont au-delà des frontières du temps et de l’espace. Préparez-vous à découvrir des perspectives nouvelles et à vous ouvrir à une réalité plus profonde et plus vraie. Plongez dans la sagesse véritable de l’Islam, laissez-vous guider par une quête spirituelle qui touchera votre cœur et éclairera votre chemin, explorez ses enseignements riches et laissez-vous toucher par la beauté et la lumière qui en émanent, sur la voie du salut.<br><br>Je vous suggère de vérifier chaque argument afin d’apprécier sa véracité. Je suis responsable de ce que j’écris, mais je ne suis point coupable de la compréhension que vous en faites. Néanmoins, je ne cesserai de vous amadouer, de vous éclaircir et de rendre les propos plus clairs.<br><br>Plongeons ensemble dans cette pantomime qui n’arrête de nous inviter. Hôtes serons-nous ? Écrivain serai-je ! Je noircis des pages pour orner le chemin et éclairer l’abysse. Assombrir pour ne pas sombrer. Pour extérioriser et exagérer nos vies, j’écris en argument et preuve pour nourrir votre esprit et apaiser vos pensées. <br><br>Ouvrez votre esprit et laissez la vérité s’y installer. Ne consommez pas tout enseignement qu’on vous donnez sans réfléchir. Jésus dit ; Ne soyez pas comme le cheval, ni comme le mulet, qui n’ont pas de l’intelligence. On note un passage dans le livre des Actes que les juifs examinaient chaque jour les Écritures pour voir si ce qu’on leur disait était exact. Alors, il faut tout analyser comme il est recommandé dans 1 Thessaloniciens : « N’éteignez pas l’esprit, n’ignorez pas les prophéties, mais examinez tout et retenez ce qui est bon. » <br><br>Que vous soyez en quête de réponses, d’épanouissement spirituel ou simplement d’une connexion plus profonde avec votre être intérieur, ce livre sera votre compagnon fidèle dans cette quête sacrée.<br><br>Avec respect et amour<br><br>Ahmed Said"
        },
        // Ajoutez les chapitres 2 à 44 ici
    };

    // Gestion du chatbot
    document.querySelector('.ai-btn').addEventListener('click', () => {
        console.log('Bouton AI cliqué');
        const chatbot = document.getElementById('chatbot');
        if (!isChatOpen) {
            chatbot.style.display = 'flex';
            isChatOpen = true;
        } else {
            chatbot.style.display = 'none';
            isChatOpen = false;
        }
    });

    document.getElementById('close-chatbot').addEventListener('click', () => {
        const chatbot = document.getElementById('chatbot');
        chatbot.style.display = 'none';
        isChatOpen = false;
    });

    document.getElementById('clear-history').addEventListener('click', () => {
        const messages = document.getElementById('messages');
        messages.innerHTML = '';
    });

    const sendBtn = document.getElementById('send');
    if (sendBtn) {
        sendBtn.onclick = () => {
            console.log('Bouton Envoyer cliqué');
            const input = document.getElementById('input');
            const messages = document.getElementById('messages');

            const question = input.value.trim().toLowerCase();
            if (!question) return;

            messages.innerHTML += `<div class="message user">${input.value}</div>`;
            input.value = '';

            // Extraire les mots-clés de la question
            const stopWords = new Set(['le', 'la', 'et', 'de', 'à', 'en', 'un', 'une', 'des', 'du', 'les', 'est', 'ce', 'cette', 'pour', 'dans', 'sur', 'avec', 'par']);
            const keywords = question.split(/\s+/).filter(word => word.length > 2 && !stopWords.has(word));

            // Trouver une réponse correspondante
            let response = 'Désolé, je ne peux répondre qu’aux questions liées à *La Voie du Salut*. Veuillez poser une question sur un chapitre ou un enseignement spécifique.';
            let bestMatchScore = 0;

            chatbotResponses.forEach(entry => {
                const matchedKeywords = keywords.filter(kw => entry.keywords.some(ekw => kw.includes(ekw.toLowerCase())));
                const matchScore = matchedKeywords.length;

                if (matchScore > bestMatchScore) {
                    bestMatchScore = matchScore;
                    response = entry.response;
                }
            });

            // Vérifier si un chapitre est mentionné
            const chapterMatch = question.match(/chapitre\s+(\d+)/);
            if (chapterMatch && !bestMatchScore) {
                const chapterNum = parseInt(chapterMatch[1]);
                if (suraContents[chapterNum]) {
                    response = `Extrait du chapitre ${chapterNum} (français) : ${suraContents[chapterNum].fr.substring(0, 200)}... Explorez ce chapitre pour plus de détails !`;
                } else {
                    response = 'Ce chapitre n’est pas disponible. Veuillez vérifier le numéro du chapitre.';
                }
            }

            messages.innerHTML += `<div class="message bot">${response}</div>`;
            messages.scrollTop = messages.scrollHeight;
        };
    } else {
        console.error('Bouton #send non trouvé dans le DOM');
    }

    // Fonctions de navigation
    document.querySelector('.start-btn').addEventListener('click', () => {
        homePage.style.display = 'none';
        indexPage.style.display = 'block';
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (indexPage.style.display === 'block') {
                indexPage.style.display = 'none';
                homePage.style.display = 'block';
            } else if (settingsPanel.style.display === 'block') {
                settingsPanel.style.display = 'none';
                readingPage.style.display = 'block';
            } else if (favoritesPage.style.display === 'block') {
                favoritesPage.style.display = 'none';
                readingPage.style.display = 'block';
            } else if (notesPage.style.display === 'block') {
                notesPage.style.display = 'none';
                readingPage.style.display = 'block';
            } else if (readingPage.style.display === 'block') {
                readingPage.style.display = 'none';
                homePage.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.index-page li').forEach(li => {
        li.addEventListener('click', () => {
            currentSura = parseInt(li.getAttribute('data-sura'));
            loadSuraContent();
            indexPage.style.display = 'none';
            readingPage.style.display = 'block';
        });
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
        if (currentSura > 1) {
            currentSura--;
            loadSuraContent();
        }
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        if (currentSura < 44) {
            currentSura++;
            loadSuraContent();
        }
    });

    document.querySelector('.settings-btn').addEventListener('click', () => {
        settingsPanel.style.display = 'block';
        readingPage.style.display = 'none';
    });

    document.querySelector('.favorites-btn').addEventListener('click', () => {
        loadFavorites();
        favoritesPage.style.display = 'block';
        readingPage.style.display = 'none';
    });

    document.querySelector('.index-btn').addEventListener('click', () => {
        indexPage.style.display = 'block';
        readingPage.style.display = 'none';
    });

    document.querySelector('.customize-btn').addEventListener('click', () => {
        customizePanel.style.display = 'block';
    });

    document.querySelector('.close-customize-btn').addEventListener('click', () => {
        customizePanel.style.display = 'none';
    });

    // Gestion des paramètres
    languageSelect.addEventListener('change', loadSuraContent);

    themeSelect.addEventListener('change', (e) => {
        document.documentElement.className = e.target.value === 'dark' ? 'dark' : '';
        localStorage.setItem('theme', e.target.value);
    });

    fontSelect.addEventListener('change', (e) => {
        const selectedFont = e.target.value;
        document.body.style.fontFamily = `${selectedFont}, sans-serif`;
        arabicText.style.fontFamily = `${selectedFont}, sans-serif`;
        textContent.style.fontFamily = `${selectedFont}, sans-serif`;
        localStorage.setItem('font', selectedFont);
    });

    fontSize.addEventListener('input', (e) => {
        currentFontSize = e.target.value;
        arabicText.style.fontSize = `${currentFontSize}px`;
        textContent.style.fontSize = `${currentFontSize}px`;
        localStorage.setItem('fontSize', currentFontSize);
    });

    // Authentification
    document.querySelectorAll('.auth-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            const username = parent.querySelector('input[type="text"]').value;
            const password = parent.querySelector('input[type="password"]').value;
            if (btn.textContent.includes('Se connecter')) {
                auth.signInWithEmailAndPassword(username, password)
                    .then(() => alert('Connecté avec succès'))
                    .catch(err => alert('Erreur de connexion : ' + err.message));
            } else if (btn.textContent.includes('S\'inscrire')) {
                auth.createUserWithEmailAndPassword(username, password)
                    .then(() => alert('Inscription réussie'))
                    .catch(err => alert('Erreur d’inscription : ' + err.message));
            }
        });
    });

    // Favoris
    favoriteBtn.addEventListener('click', () => {
        if (!favorites.includes(currentSura)) {
            favorites.push(currentSura);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            favoriteBtn.textContent = '★';
        } else {
            favorites = favorites.filter(f => f !== currentSura);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            favoriteBtn.textContent = '☆';
        }
    });

    function loadFavorites() {
        favoritesList.innerHTML = '';
        favorites.forEach(sura => {
            const li = document.createElement('li');
            li.textContent = `Chapitre ${sura}`;
            li.addEventListener('click', () => {
                currentSura = sura;
                loadSuraContent();
                favoritesPage.style.display = 'none';
                readingPage.style.display = 'block';
            });
            favoritesList.appendChild(li);
        });
    }

    // Notes
    document.querySelector('.note-btn').addEventListener('click', () => {
        notesPage.style.display = 'block';
        readingPage.style.display = 'none';
        loadNotes();
    });

    document.querySelector('.add-category-btn').addEventListener('click', () => {
        const category = document.getElementById('newCategory').value;
        if (category && !notes[category]) {
            notes[category] = '';
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
            document.getElementById('newCategory').value = '';
        }
    });

    function loadNotes() {
        const categoriesList = document.getElementById('categoriesList');
        categoriesList.innerHTML = '';
        for (let category in notes) {
            const div = document.createElement('div');
            div.className = 'category';
            div.innerHTML = `<h3>${category}</h3><textarea>${notes[category]}</textarea>`;
            div.querySelector('textarea').addEventListener('input', (e) => {
                notes[category] = e.target.value;
                localStorage.setItem('notes', JSON.stringify(notes));
            });
            categoriesList.appendChild(div);
        }
    }

    // Recherche intelligente
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        let totalOccurrences = 0;
        let resultsBySura = {};

        for (let sura in suraContents) {
            const content = suraContents[sura][languageSelect.value] || '';
            const verses = content.split('<br>').filter(verse => verse.trim());
            let suraMatches = [];

            verses.forEach((verse, verseIndex) => {
                const lowerVerse = verse.toLowerCase().replace(/<[^>]+>/g, '');
                let matchCount = (lowerVerse.match(new RegExp(`\\b${query}\\b`, 'g')) || []).length;

                if (matchCount > 0) {
                    totalOccurrences += matchCount;
                    suraMatches.push({
                        verseText: verse,
                        verseIndex: verseIndex + 1,
                        occurrences: matchCount
                    });
                }
            });

            if (suraMatches.length > 0) {
                resultsBySura[sura] = suraMatches;
            }
        }

        searchResults.style.display = 'block';
        const totalDiv = document.createElement('div');
        totalDiv.className = 'result-header';
        totalDiv.textContent = `Total occurrences : ${totalOccurrences}`;
        searchResults.appendChild(totalDiv);

        for (let sura in resultsBySura) {
            const suraDiv = document.createElement('div');
            suraDiv.className = 'result-sura';
            suraDiv.innerHTML = `<strong>Chapitre ${sura}</strong>`;
            searchResults.appendChild(suraDiv);

            resultsBySura[sura].forEach(match => {
                const verseDiv = document.createElement('div');
                verseDiv.className = 'result-item';
                const highlightedText = match.verseText.replace(
                    new RegExp(`\\b${query}\\b`, 'gi'),
                    match => `<span class="highlight">${match}</span>`
                );
                verseDiv.innerHTML = `Paragraphe ${match.verseIndex} : ${highlightedText} (${match.occurrences} occurrence${match.occurrences > 1 ? 's' : ''})`;
                verseDiv.addEventListener('click', () => {
                    currentSura = parseInt(sura);
                    loadSuraContent(match.verseIndex);
                    searchResults.style.display = 'none';
                    const verseElement = document.getElementById(`verse-${match.verseIndex}`);
                    if (verseElement) {
                        verseElement.scrollIntoView({ behavior: 'smooth' });
                        verseElement.classList.add('highlight-verse');
                        setTimeout(() => verseElement.classList.remove('highlight-verse'), 2000);
                    }
                });
                searchResults.appendChild(verseDiv);
            });
        }

        if (totalOccurrences === 0) {
            const noResultDiv = document.createElement('div');
            noResultDiv.className = 'result-item';
            noResultDiv.textContent = 'Aucun résultat trouvé';
            searchResults.appendChild(noResultDiv);
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Lecture à haute voix
    voicePlayBtn.addEventListener('click', () => {
        if (!synth) {
            console.error('Synthèse vocale non supportée par ce navigateur');
            return;
        }

        if (isPlaying) {
            synth.cancel();
            isPlaying = false;
            voicePlayBtn.innerHTML = '<i class="fas fa-play"></i> Lecture à haute voix';
            return;
        }

        const textToRead = languageSelect.value === 'ar' ? arabicText.innerText : textContent.innerText;
        if (!textToRead || textToRead.trim() === '') {
            console.error('Aucun texte disponible pour la lecture');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = languageSelect.value === 'ar' ? 'ar-SA' : languageSelect.value === 'en' ? 'en-US' : 'fr-FR';

        const selectVoice = () => {
            const voices = synth.getVoices();
            let selectedVoice;

            if (languageSelect.value === 'fr') {
                selectedVoice = voices.find(voice =>
                    voice.lang === 'fr-FR' &&
                    (voice.name.toLowerCase().includes('thomas') ||
                     voice.name.toLowerCase().includes('male') ||
                     voice.name.toLowerCase().includes('fr-fr'))
                ) || voices.find(voice => voice.lang === 'fr-FR') || voices[0];
            } else if (languageSelect.value === 'en') {
                selectedVoice = voices.find(voice =>
                    voice.lang === 'en-US' &&
                    (voice.name.toLowerCase().includes('guy') ||
                     voice.name.toLowerCase().includes('male') ||
                     voice.name.toLowerCase().includes('daniel'))
                ) || voices.find(voice => voice.lang === 'en-US') || voices[0];
            } else if (languageSelect.value === 'ar') {
                selectedVoice = voices.find(voice =>
                    voice.lang === 'ar-SA' &&
                    (voice.name.toLowerCase().includes('male') ||
                     voice.name.toLowerCase().includes('ar'))
                ) || voices.find(voice => voice.lang === 'ar-SA') || voices[0];
            }

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                console.log(`Voix sélectionnée : ${selectedVoice.name}`);
            } else {
                console.log('Aucune voix spécifique trouvée, utilisation de la voix par défaut');
            }
        };

        if (synth.getVoices().length === 0) {
            synth.onvoiceschanged = () => {
                selectVoice();
                synth.speak(utterance);
            };
        } else {
            selectVoice();
            synth.speak(utterance);
        }

        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onend = () => {
            isPlaying = false;
            voicePlayBtn.innerHTML = '<i class="fas fa-play"></i> Lecture à haute voix';
            console.log('Lecture terminée');
        };

        utterance.onerror = (e) => {
            isPlaying = false;
            voicePlayBtn.innerHTML = '<i class="fas fa-play"></i> Lecture à haute voix';
            console.error(`Erreur de synthèse vocale : ${e.error}`);
        };

        isPlaying = true;
        voicePlayBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    });

    // Zoom
    document.querySelector('.zoom-in-btn').addEventListener('click', () => {
        if (currentFontSize < 30) {
            currentFontSize += 2;
            fontSize.value = currentFontSize;
            arabicText.style.fontSize = `${currentFontSize}px`;
            textContent.style.fontSize = `${currentFontSize}px`;
            localStorage.setItem('fontSize', currentFontSize);
        }
    });

    document.querySelector('.zoom-out-btn').addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            fontSize.value = currentFontSize;
            arabicText.style.fontSize = `${currentFontSize}px`;
            textContent.style.fontSize = `${currentFontSize}px`;
            localStorage.setItem('fontSize', currentFontSize);
        }
    });

    // Personnalisation des couleurs
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.style.backgroundColor = btn.getAttribute('data-color');
            localStorage.setItem('backgroundColor', btn.getAttribute('data-color'));
        });
    });

    // Charger le contenu du chapitre
    function loadSuraContent(verseIndex = null) {
        const suraData = suraContents[currentSura] || suraContents[1];
        suraTitle.textContent = `La Voie du Salut ${currentSura}`;
        const content = suraData[languageSelect.value] || suraData.fr;
        const verses = content.split('<br>').filter(verse => verse.trim());

        const html = verses.map((verse, index) =>
            `<div id="verse-${index + 1}" class="verse">${verse}</div>`
        ).join('');

        if (languageSelect.value === 'ar') {
            arabicText.innerHTML = html;
            textContent.style.display = 'none';
            arabicText.style.display = 'block';
        } else {
            textContent.innerHTML = html;
            arabicText.style.display = 'none';
            textContent.style.display = 'block';
        }

        arabicText.style.fontSize = `${currentFontSize}px`;
        textContent.style.fontSize = `${currentFontSize}px`;
        favoriteBtn.textContent = favorites.includes(currentSura) ? '★' : '☆';

        if (verseIndex) {
            const verseElement = document.getElementById(`verse-${verseIndex}`);
            if (verseElement) {
                verseElement.scrollIntoView({ behavior: 'smooth' });
                verseElement.classList.add('highlight-verse');
                setTimeout(() => verseElement.classList.remove('highlight-verse'), 2000);
            }
        }
    }

    // Charger les paramètres sauvegardés
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        themeSelect.value = savedTheme;
        document.documentElement.className = savedTheme === 'dark' ? 'dark' : '';
    }

    const savedFont = localStorage.getItem('font');
    if (savedFont) {
        fontSelect.value = savedFont;
        document.body.style.fontFamily = `${savedFont}, sans-serif`;
        arabicText.style.fontFamily = `${savedFont}, sans-serif`;
        textContent.style.fontFamily = `${savedFont}, sans-serif`;
    }

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        fontSize.value = currentFontSize;
        arabicText.style.fontSize = `${savedFontSize}px`;
        textContent.style.fontSize = `${savedFontSize}px`;
    }

    const savedBgColor = localStorage.getItem('backgroundColor');
    if (savedBgColor) {
        document.body.style.backgroundColor = savedBgColor;
    }

    // Initialisation
    loadSuraContent();
    loadFavorites();
});
