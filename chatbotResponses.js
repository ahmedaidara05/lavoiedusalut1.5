// chatbotResponses.js
const chatbotResponses = [
  {
    keywords: ["source sacrée", "genèse divine", "création sainte", "début céleste", "origine divine", "aube sacrée", "commencement divin", "création", "genèse", "univers"],
    response: "Dans le chapitre La Genèse, Ahmed Said Aidara explore la source sacrée de l’univers, révélée par le Coran, invitant à méditer sur la vérité islamique de la création."
  },
  {
    keywords: ["être saint", "essence divine", "moi sacré", "identité céleste", "nature sacrée", "âme divine", "moi spirituel", "identité"],
    response: "Dans le chapitre Qui m’a créé et qui suis-je ?, Ahmed Said Aidara invite à découvrir l’être saint créé par Allah, guidant vers la vérité islamique."
  },
  {
    keywords: ["mission sainte", "projet divin", "but sacré", "finalité céleste", "dessein saint", "vocation divine", "intention divine", "plan sacré"],
    response: "Dans le chapitre Pourquoi on m’a créé ?, Ahmed Said Aidara révèle la mission sainte de l’humanité, soumise à la vérité d’Allah pour atteindre le salut."
  },
  {
    keywords: ["sort divin", "futur sacré", "destin saint", "devenir divin", "fin céleste", "horizon divin", "futur saint"],
    response: "Dans le chapitre Qu’est-ce qui m’attend ?, Ahmed Said Aidara explore le sort divin de l’âme selon l’Islam, menant au salut éternel."
  },
  {
    keywords: ["repos saint", "paradis sacré", "demeure divine", "éternité céleste", "jardin saint", "havre divin", "refuge sacré"],
    response: "Dans le chapitre Où irai-je ?, Ahmed Said Aidara décrit le repos saint du paradis islamique, destination des croyants fidèles."
  },
  {
    keywords: ["envoyé sacré", "Mouhammad divin", "prophète saint", "guide divin", "messager céleste", "héraut divin", "émissaire saint"],
    response: "Dans le chapitre Mouhammad, Ahmed Said Aidara célèbre l’envoyé sacré Mouhammad, porteur de la vérité coranique pour guider l’humanité."
  },
  {
    keywords: ["prophète céleste", "Jésus divin", "Isa sacré", "messager saint", "guide divin", "envoyé saint", "Jésus islamique"],
    response: "Dans le chapitre Jésus-Christ, Ahmed Said Aidara présente Jésus comme prophète céleste, rejetant sa divinité chrétienne et affirmant sa mission islamique."
  },
  {
    keywords: ["signes divins", "prodiges sacrés", "merveilles saintes", "actes divins", "miracles célestes", "gestes divins"],
    response: "Dans le chapitre Les miracles de Jésus, Ahmed Said Aidara explore les signes divins de Jésus, confirmant sa prophétie islamique."
  },
  {
    keywords: ["triade divine", "trinité sainte", "union sacrée", "dogme céleste", "croyance divine", "foi trinitaire"],
    response: "Dans le chapitre La trinité, Ahmed Said Aidara rejette la triade divine chrétienne, prônant l’unicité d’Allah selon l’Islam."
  },
  {
    keywords: ["appel divin", "exhortation sainte", "prêche sacré", "message céleste", "discours divin", "plaidoyer divin"],
    response: "Dans le chapitre Harangue, Ahmed Said Aidara délivre un appel divin à la foi islamique, avec respect et vérité."
  },
  {
    keywords: ["unité divine", "fraternité sainte", "solidarité sacrée", "communauté céleste", "lien saint", "alliance divine"],
    response: "Dans le chapitre Inclusion, Ahmed Said Aidara promeut l’unité divine entre musulmans et non-musulmans pour une coexistence respectueuse."
  },
  {
    keywords: ["Allah sacré", "Dieu divin", "Créateur saint", "Seigneur céleste", "maître sacré", "Dieu saint"],
    response: "Dans le chapitre Qui est Dieu ?, Ahmed Said Aidara décrit Allah comme le Dieu sacré, unique et miséricordieux selon l’Islam."
  },
  {
    keywords: ["divinité Jésus", "Christ saint", "Fils divin", "héritier sacré", "Jésus céleste", "Jésus sacré"],
    response: "Dans le chapitre Jésus, est-il Dieu ?, Ahmed Said Aidara rejette la divinité de Jésus, affirmant son rôle de prophète islamique."
  },
  {
    keywords: ["textes chrétiens", "Écritures divines", "paroles saintes", "livres sacrés", "Testament saint", "manuscrits chrétiens"],
    response: "Dans le chapitre La Bible, Ahmed Said Aidara examine les textes chrétiens, comparés au Coran pour révéler la vérité islamique."
  },
  {
    keywords: ["analyse sainte", "comparaison divine", "parallèle céleste", "corrélation sacrée", "similitude divine", "comparatif divin"],
    response: "Dans le chapitre Le Coran et la Bible, Ahmed Said Aidara analyse les textes sacrés, affirmant la supériorité du Coran comme vérité divine."
  },
  {
    keywords: ["fiabilité divine", "authenticité sacrée", "vérité sainte", "source divine", "origine céleste", "révélation sainte"],
    response: "Dans le chapitre L’auteur du Coran est-il un homme ?, Ahmed Said Aidara défend la fiabilité divine du Coran, rejetant une origine humaine."
  },
  {
    keywords: ["découverte sainte", "science divine", "savoir sacré", "connaissance céleste", "vérité divine", "savoir saint"],
    response: "Dans le chapitre Le Coran et la Science, Ahmed Said Aidara explore la découverte sainte du Coran, preuve de sa révélation divine."
  },
  {
    keywords: ["originalité divine", "inspiration sainte", "unicité sacrée", "emprunt céleste", "parallèle divin", "singularité divine"],
    response: "Dans le chapitre Le Coran, une copie de l’ancien testament ?, Ahmed Said Aidara affirme l’originalité divine du Coran, non copié."
  },
  {
    keywords: ["calcul divin", "nombres saints", "précision sacrée", "logique céleste", "mathématiques saintes", "ordre divin"],
    response: "Dans le chapitre Mathématique, dans le Coran ?, Ahmed Said Aidara analyse le calcul divin des motifs coraniques, signes de vérité."
  },
  {
    keywords: ["direction divine", "guidance sainte", "chemin sacré", "voie céleste", "orientation divine", "voie sacrée"],
    response: "Dans le chapitre Le Coran, Ahmed Said Aidara présente le Coran comme direction divine pour guider l’humanité vers le salut."
  },
  {
    keywords: ["rencontre divine", "dialogue sacré", "échange saint", "union céleste", "comparaison divine", "concorde divine"],
    response: "Dans le chapitre L’Islam et le Christianisme, Ahmed Said Aidara promeut une rencontre divine pour révéler la vérité de l’Islam."
  },
  {
    keywords: ["grâce sainte", "salut divin", "rédemption sacrée", "libération céleste", "délivrance divine", "voie divine"],
    response: "Dans le chapitre La Voie du Salut, Ahmed Said Aidara affirme l’Islam comme grâce sainte, menant au salut éternel."
  },
  {
    keywords: ["rédempteur divin", "sauveur sacré", "libérateur saint", "guide céleste", "messie divin", "prophète sauveur"],
    response: "Dans le chapitre Jésus, est-il le sauveur de l’humanité ?, Ahmed Said Aidara rejette Jésus comme rédempteur, affirmant qu’Allah seul sauve."
  },
  {
    keywords: ["délivrance sainte", "salut sacré", "rachat divin", "grâce céleste", "libération divine", "pardon divin"],
    response: "Dans le chapitre Par qui Dieu sauve l’humanité ?, Ahmed Said Aidara affirme le salut par la grâce divine d’Allah."
  },
  {
    keywords: ["Isa divin", "Jésus saint", "prophète islamique", "messager sacré", "guide céleste", "soumission sainte"],
    response: "Dans le chapitre Jésus, est-il musulman ?, Ahmed Said Aidara présente Jésus comme prophète islamique, soumis à Allah."
  },
  {
    keywords: ["invocation sainte", "salat divine", "prière sacrée", "rituel céleste", "adoration divine", "prière divine"],
    response: "Dans le chapitre La prière musulmane, dans la Bible ?, Ahmed Said Aidara explore la salat islamique et ses parallèles bibliques."
  },
  {
    keywords: ["foi islamique", "croyance sainte", "religion sacrée", "soumission divine", "Islam saint", "croyance divine"],
    response: "Dans le chapitre L’islam, dans la Bible ?, Ahmed Said Aidara examine la foi islamique dans les textes bibliques."
  },
  {
    keywords: ["prescriptions saintes", "lois divines", "commandements sacrés", "décalogue saint", "règles divines", "décret divin"],
    response: "Dans le chapitre Les dix commandements, Ahmed Said Aidara compare les prescriptions saintes coraniques et bibliques."
  },
  {
    keywords: ["fraternité divine", "union sacrée", "harmonie sainte", "solidarité céleste", "cohésion divine", "paix divine"],
    response: "Dans le chapitre L’islam et le christianisme, Ahmed Said Aidara promeut la fraternité divine entre musulmans et chrétiens."
  },
  {
    keywords: ["offrande divine", "croix sainte", "sacrifice sacré", "expiation divine", "mort christique", "sacrifice saint"],
    response: "Dans le chapitre La crucifixion de Jésus-Christ, Ahmed Said Aidara rejette l’offrande divine chrétienne, affirmant la vérité islamique."
  },
  {
    keywords: ["livre sacré", "manuscrit divin", "texte saint", "Évangile divin", "écrit sacré", "parchemin divin"],
    response: "Dans le chapitre L’Évangile de Barnabé, Ahmed Said Aidara analyse ce livre sacré, explorant son lien avec l’Islam."
  },
  {
    keywords: ["transgression sainte", "péché divin", "faute sacrée", "erreur céleste", "offense divine", "faute sainte"],
    response: "Dans le chapitre La question du péché, Ahmed Said Aidara compare la transgression sainte dans l’Islam et le Christianisme."
  },
  {
    keywords: ["prédiction divine", "prophétie sainte", "oracle céleste", "vision sacrée", "annonce divine", "oracle saint"],
    response: "Dans le chapitre Mouhammad PSL dans la Bible ?, Ahmed Said Aidara explore la prédiction divine de Mouhammad."
  },
  {
    keywords: ["résumé divin", "conclusion sainte", "fin sacrée", "clôture céleste", "bilan saint", "clôture divine"],
    response: "Dans le chapitre Epilogue, Ahmed Said Aidara offre un résumé divin de la vérité islamique, réaffirmant la voie du salut."
  },
  {
    keywords: ["certitude divine", "salut sacré", "promesse sainte", "assurance céleste", "foi divine", "garantie divine"],
    response: "Dans le chapitre Le salut du musulman est-il garanti ?, Ahmed Said Aidara explore la certitude divine du salut islamique."
  },
  {
    keywords: ["message sacré", "rappel divin", "appel saint", "exhortation sainte", "invitation divine", "rappel saint"],
    response: "Dans le chapitre Appel et Rappel, Ahmed Said Aidara délivre un message sacré, invitant à embrasser la vérité de l’Islam."
  },
  {
    keywords: ["religion sacrée", "foi divine", "croyance sainte", "union divine", "vérité céleste", "foi unifiée"],
    response: "Dans le chapitre Un Dieu, une religion, Ahmed Said Aidara promeut l’Islam comme religion sacrée unifiant les croyants."
  },
  {
    keywords: ["challenge divin", "épreuve sacrée", "défi saint", "test céleste", "obstacle sacré", "défi sacré"],
    response: "Dans le chapitre Liste de défis, Ahmed Said Aidara propose des challenges divins pour renforcer la foi islamique."
  },
  {
    keywords: ["discours sacré", "énoncé divin", "proclamation sainte", "message céleste", "déclaration divine", "proclamation divine"],
    response: "Dans le chapitre Énoncé, Ahmed Said Aidara délivre un discours sacré pour réaffirmer la vérité islamique."
  },
  {
    keywords: ["eschatologie divine", "fin sainte", "jugement sacré", "apocalypse divine", "dernier jour", "fin divine"],
    response: "Dans le chapitre Apocalypse, Ahmed Said Aidara explore l’eschatologie divine de l’Islam, guidant vers le salut."
  },
  {
    keywords: ["conclusion divine", "postface sacrée", "résumé saint", "bilan céleste", "récit sacré", "bilan divin"],
    response: "Dans le chapitre Postface, Ahmed Said Aidara offre une conclusion divine, consolidant la vérité islamique."
  },
  {
    keywords: ["mission divine", "rôle sacré", "nature sainte", "identité divine", "prophète céleste", "nature divine"],
    response: "Dans le chapitre Qui est Jésus ?, Ahmed Said Aidara affirme la mission divine de Jésus comme prophète islamique."
  },
  {
    keywords: ["nom divin", "terme sacré", "concept saint", "père divin", "fils sacré", "terme divin"],
    response: "Dans le chapitre Le terme Dieu, Père et Fils de Dieu, Ahmed Said Aidara rejette les noms chrétiens, prônant l’unicité d’Allah."
  }
];

export default chatbotResponses;
