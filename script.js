document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.getElementById('timeline');
    const filterSelect = document.getElementById('character-filter');
    const modal = document.getElementById('event-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalChapter = document.getElementById('modal-chapter');
    const modalDescription = document.getElementById('modal-description');
    const modalInvolved = document.getElementById('modal-involved');
    const closeButton = document.querySelector('.close-button');

    // --- Gögn úr fyrri úrvinnslu ---
    // (Þetta þyrfti að vera mun ítarlegra fyrir alla söguna)
    // Hér eru nokkur dæmi byggð á fyrstu köflunum
    const timelineData = [
        // Mörður Gígja
        { id: 1, chapter: 1, character: "Mörður gígja", title: "Kynning", description: "Ríkur og lögvitur höfðingi á Velli. Á dótturina Unni.", involved: ["Unnur"] },
        { id: 2, chapter: 2, character: "Mörður gígja", title: "Tekur við bónorði", description: "Tekur við bónorði Hrúts fyrir Unni.", involved: ["Hrútur", "Unnur", "Höskuldur"] },
        { id: 3, chapter: 2, character: "Mörður gígja", title: "Frestar brúðkaupi", description: "Samþykkir að fresta brúðkaupi Unnar og Hrúts vegna Noregsferðar Hrúts.", involved: ["Unnur", "Hrútur"] },
        { id: 4, chapter: 7, character: "Mörður gígja", title: "Tekur við Unni", description: "Tekur við Unni eftir skilnað hennar við Hrút.", involved: ["Unnur"] },
        { id: 5, chapter: 8, character: "Mörður gígja", title: "Sækir fésök", description: "Fer með fésök Unnar á hendur Hrúti á Alþingi.", involved: ["Unnur", "Hrútur"] },
        { id: 6, chapter: 8, character: "Mörður gígja", title: "Hólmgöngu synjað", description: "Þorir ekki að ganga á hólm við Hrút, tapar fé og hlýtur svívirðu.", involved: ["Hrútur", "Jörundur goði"] },
        { id: 7, chapter: 18, character: "Mörður gígja", title: "Andlát", description: "Andast og skilur eftir auð til Unnar.", involved: ["Unnur"] },

        // Unnur Marðardóttir
        { id: 8, chapter: 1, character: "Unnur Marðardóttir", title: "Kynning", description: "Dóttir Marðar gígju, besti kostur á Rangárvöllum.", involved: ["Mörður gígja"] },
        { id: 9, chapter: 2, character: "Unnur Marðardóttir", title: "Föstnuð Hrúti", description: "Föstnuð Hrúti Herjólfssyni á Alþingi.", involved: ["Hrútur", "Mörður gígja", "Höskuldur"] },
        { id: 10, chapter: 2, character: "Unnur Marðardóttir", title: "Sit í festum", description: "Sit í festum í þrjá vetur.", involved: ["Hrútur"] },
        { id: 11, chapter: 6, character: "Unnur Marðardóttir", title: "Giftist Hrúti", description: "Giftist Hrúti, óhamingjusamt hjónaband vegna álaga Gunnhildar.", involved: ["Hrútur", "Gunnhildur (óbeint)"] },
        { id: 12, chapter: 6, character: "Unnur Marðardóttir", title: "Leitar ráða", description: "Leitar ráða hjá föður sínum á Alþingi.", involved: ["Mörður gígja"] },
        { id: 13, chapter: 7, character: "Unnur Marðardóttir", title: "Skilnaður", description: "Segir löglega skilið við Hrút meðan hann er fjarverandi.", involved: ["Mörður gígja", "Hrútur", "Sigmundur Össurarson"] },
        { id: 14, chapter: 18, character: "Unnur Marðardóttir", title: "Erfir föður sinn", description: "Erfir fé Marðar gígju.", involved: ["Mörður gígja"] },
        { id: 15, chapter: 18, character: "Unnur Marðardóttir", title: "Eyðir fé", description: "Eyðir lausafé sínu.", involved: [] },
        { id: 16, chapter: 21, character: "Unnur Marðardóttir", title: "Leitar til Gunnars", description: "Leitar ásjár hjá Gunnari Hámundarsyni og fær hann til að heimta mundina.", involved: ["Gunnar"] },
        { id: 17, chapter: 24, character: "Unnur Marðardóttir", title: "Fær mundina", description: "Fær fé sitt greitt frá Hrúti.", involved: ["Gunnar", "Hrútur"] },
        { id: 18, chapter: 25, character: "Unnur Marðardóttir", title: "Giftist Valgarði", description: "Giftist Valgarði hinum gráa.", involved: ["Valgarður hinn grái", "Gunnar (ósáttur)", "Njáll (ósáttur)"] },
        { id: 19, chapter: 25, character: "Unnur Marðardóttir", title: "Eignast Mörð", description: "Eignast soninn Mörð Valgarðsson.", involved: ["Valgarður hinn grái", "Mörður Valgarðsson"] },

        // Höskuldur Dala-Kollsson
        { id: 20, chapter: 1, character: "Höskuldur Dala-Kollsson", title: "Kynning", description: "Höfðingi á Höskuldsstöðum, bróðir Hrúts.", involved: ["Hrútur", "Hallgerður"] },
        { id: 21, chapter: 1, character: "Höskuldur Dala-Kollsson", title: "Kynnir Hallgerði", description: "Kynnir Hallgerði dóttur sína fyrir Hrúti.", involved: ["Hallgerður", "Hrútur"] },
        { id: 22, chapter: 1, character: "Höskuldur Dala-Kollsson", title: "Reiðist Hrúti", description: "Reiðist spá Hrúts um Hallgerði.", involved: ["Hrútur", "Hallgerður"] },
        { id: 23, chapter: 2, character: "Höskuldur Dala-Kollsson", title: "Hvetur Hrút", description: "Hvetur Hrút til kvonfangs, stingur upp á Unni.", involved: ["Hrútur", "Unnur"] },
        { id: 24, chapter: 2, character: "Höskuldur Dala-Kollsson", title: "Hjálpar Hrúti", description: "Hjálpar Hrúti við bónorð og fjármál Noregsferðar.", involved: ["Hrútur", "Mörður gígja"] },
        { id: 25, chapter: 9, character: "Höskuldur Dala-Kollsson", title: "Giftir Hallgerði Þorvaldi", description: "Giftir Hallgerði Þorvaldi Ósvífurssyni án hennar samþykkis.", involved: ["Hallgerður", "Þorvaldur Ósvífursson", "Ósvífur"] },
        { id: 26, chapter: 12, character: "Höskuldur Dala-Kollsson", title: "Fréttir víg Þorvalds", description: "Fréttir af drápi Þorvalds, tekur við Hallgerði.", involved: ["Hallgerður", "Þjóstólfur"] },
        { id: 27, chapter: 12, character: "Höskuldur Dala-Kollsson", title: "Sættir við Ósvífur", description: "Sættist við Ósvífur með hjálp Hrúts, greiðir manngjöld.", involved: ["Ósvífur", "Hrútur"] },
        { id: 28, chapter: 13, character: "Höskuldur Dala-Kollsson", title: "Giftir Hallgerði Glúmi", description: "Giftir Hallgerði Glúmi Óleifssyni.", involved: ["Hallgerður", "Glúmur Óleifsson", "Þórarinn Ragabróðir", "Hrútur"] },
        { id: 29, chapter: 17, character: "Höskuldur Dala-Kollsson", title: "Fréttir víg Glúms", description: "Fréttir af drápi Glúms, þakkar Hrúti fyrir víg Þjóstólfs.", involved: ["Glúmur Óleifsson", "Þjóstólfur", "Hrútur"] },
        { id: 30, chapter: 33, character: "Höskuldur Dala-Kollsson", title: "Tekur við Gunnari", description: "Tekur við Gunnari þegar hann biður Hallgerðar.", involved: ["Gunnar", "Hallgerður", "Hrútur"] },

         // Hrútur Herjólfsson
        { id: 31, chapter: 1, character: "Hrútur Herjólfsson", title: "Kynning", description: "Bróðir Höskulds, vitur og vænn.", involved: ["Höskuldur"] },
        { id: 32, chapter: 1, character: "Hrútur Herjólfsson", title: "Spáir um Hallgerði", description: "Spáir illa fyrir Hallgerði ('þjófsaugu').", involved: ["Höskuldur", "Hallgerður"] },
        { id: 33, chapter: 2, character: "Hrútur Herjólfsson", title: "Biður Unnar", description: "Biður Unnar Marðardóttur með hjálp Höskulds.", involved: ["Unnur", "Höskuldur", "Mörður gígja"] },
        { id: 34, chapter: 2, character: "Hrútur Herjólfsson", title: "Erfðamál í Noregi", description: "Fær fréttir af arfi, frestar brúðkaupi.", involved: ["Höskuldur", "Mörður gígja", "Össur"] },
        { id: 35, chapter: 3, character: "Hrútur Herjólfsson", title: "Noregsför", description: "Fer til Noregs, hittir Gunnhildi drottningu, verður hirðmaður og ástmaður hennar.", involved: ["Gunnhildur", "Haraldur gráfeldur", "Össur", "Ögmundur"] },
        { id: 36, chapter: 4, character: "Hrútur Herjólfsson", title: "Herför gegn Sóta", description: "Fer í herför til að ná arfi.", involved: ["Gunnhildur", "Haraldur gráfeldur", "Úlfur óþveginn", "Sóti"] },
        { id: 37, chapter: 5, character: "Hrútur Herjólfsson", title: "Bardagi í Eyrasundi", description: "Berst við Atla Arnviðarson og sigrar.", involved: ["Atli Arnviðarson", "Úlfur óþveginn", "Össur"] },
        { id: 38, chapter: 6, character: "Hrútur Herjólfsson", title: "Álög Gunnhildar", description: "Gunnhildur leggur á hann getuleysisálög er hann fer til Íslands.", involved: ["Gunnhildur"] },
        { id: 39, chapter: 6, character: "Hrútur Herjólfsson", title: "Giftist Unni", description: "Giftist Unni, óhamingjusamt hjónaband.", involved: ["Unnur"] },
        { id: 40, chapter: 7, character: "Hrútur Herjólfsson", title: "Skilnaður", description: "Unnur skilur við hann.", involved: ["Unnur"] },
        { id: 41, chapter: 8, character: "Hrútur Herjólfsson", title: "Hólmganga við Mörð", description: "Skorar Merði gígju á hólm vegna mundarins, Mörður þorir ekki.", involved: ["Mörður gígja", "Unnur", "Jörundur goði"] },
        { id: 42, chapter: 17, character: "Hrútur Herjólfsson", title: "Drepur Þjóstólf", description: "Drepur Þjóstólf er hann leitar til hans eftir víg Glúms.", involved: ["Þjóstólfur", "Hallgerður"] },
        { id: 43, chapter: 33, character: "Hrútur Herjólfsson", title: "Ráðleggur gegn giftingu Hallgerðar", description: "Ráðleggur Gunnari gegn giftingu við Hallgerði en lætur undan.", involved: ["Gunnar", "Hallgerður", "Höskuldur"] },

        // Hallgerður Höskuldsdóttir
        { id: 44, chapter: 1, character: "Hallgerður Höskuldsdóttir", title: "Kynning", description: "Dóttir Höskulds, fríð en með 'þjófsaugu'.", involved: ["Höskuldur", "Hrútur"] },
        { id: 45, chapter: 9, character: "Hallgerður Höskuldsdóttir", title: "Fyrsta hjónaband", description: "Gift Þorvaldi Ósvífurssyni gegn vilja sínum.", involved: ["Höskuldur", "Þorvaldur Ósvífursson", "Þjóstólfur"] },
        { id: 46, chapter: 11, character: "Hallgerður Höskuldsdóttir", title: "Kinnhestur og hefnd", description: "Fær kinnhest af Þorvaldi. Þjóstólfur drepur Þorvald.", involved: ["Þorvaldur Ósvífursson", "Þjóstólfur"] },
        { id: 47, chapter: 13, character: "Hallgerður Höskuldsdóttir", title: "Annað hjónaband", description: "Giftist Glúmi Óleifssyni.", involved: ["Glúmur Óleifsson", "Höskuldur", "Hrútur"] },
        { id: 48, chapter: 14, character: "Hallgerður Höskuldsdóttir", title: "Eignast Þorgerði", description: "Eignast dótturina Þorgerði.", involved: ["Glúmur Óleifsson"] },
        { id: 49, chapter: 16, character: "Hallgerður Höskuldsdóttir", title: "Kinnhestur og víg Glúms", description: "Fær kinnhest af Glúmi. Þjóstólfur drepur Glúm.", involved: ["Glúmur Óleifsson", "Þjóstólfur"] },
        { id: 50, chapter: 33, character: "Hallgerður Höskuldsdóttir", title: "Hittir Gunnar", description: "Hittir Gunnar á Alþingi.", involved: ["Gunnar"] },
        { id: 51, chapter: 33, character: "Hallgerður Höskuldsdóttir", title: "Þriðja hjónaband", description: "Giftist Gunnari Hámundarsyni.", involved: ["Gunnar", "Höskuldur", "Hrútur"] },
        { id: 52, chapter: 35, character: "Hallgerður Höskuldsdóttir", title: "Deilur við Bergþóru", description: "Deilur við Bergþóru hefjast.", involved: ["Bergþóra", "Gunnar", "Njáll"] },
        { id: 53, chapter: 36, character: "Hallgerður Höskuldsdóttir", title: "Lætur drepa Svart", description: "Lætur Kol drepa Svart, húskarl Njáls.", involved: ["Kolur", "Svartur", "Gunnar", "Bergþóra"] },
        { id: 54, chapter: 48, character: "Hallgerður Höskuldsdóttir", title: "Lætur stela", description: "Lætur Melkólf stela mat úr Kirkjubæ og brenna búrið.", involved: ["Melkólfur", "Otkell"] },
        { id: 55, chapter: 48, character: "Hallgerður Höskuldsdóttir", title: "Kinnhestur Gunnars", description: "Fær kinnhest af Gunnari vegna þjófnaðarins.", involved: ["Gunnar"] },
        { id: 56, chapter: 77, character: "Hallgerður Höskuldsdóttir", title: "Neitar Gunnari um hár", description: "Neitar að gefa Gunnari hár sitt til bogastrengs í síðasta bardaga hans.", involved: ["Gunnar", "Rannveig"] },

        // Gunnar Hámundarson
        { id: 57, chapter: 19, character: "Gunnar Hámundarson", title: "Kynning", description: "Bóndi á Hlíðarenda, frændi Unnar, best vígur.", involved: ["Unnur", "Kolskeggur", "Hjörtur"] },
        { id: 58, chapter: 21, character: "Gunnar Hámundarson", title: "Tekur að sér mál Unnar", description: "Tekur að sér að heimta mund Unnar af Hrúti.", involved: ["Unnur"] },
        { id: 59, chapter: 21, character: "Gunnar Hámundarson", title: "Leitar ráða hjá Njáli", description: "Leitar ráða hjá Njáli.", involved: ["Njáll"] },
        { id: 60, chapter: 23, character: "Gunnar Hámundarson", title: "Kaupa-Héðinn", description: "Stefni Hrúti í dulargervi.", involved: ["Hrútur", "Höskuldur", "Njáll (ráð)"] },
        { id: 61, chapter: 24, character: "Gunnar Hámundarson", title: "Vinnur mál Unnar", description: "Vinnur málið á Alþingi með hólmgönguskori.", involved: ["Unnur", "Hrútur", "Höskuldur", "Mörður gígja"] },
        { id: 62, chapter: 29, character: "Gunnar Hámundarson", title: "Víkingaferð", description: "Fer í hernað í Austurveg.", involved: ["Kolskeggur", "Hallvarður hvíti", "Ölvir"] },
        { id: 63, chapter: 30, character: "Gunnar Hámundarson", title: "Bardagar í víking", description: "Berst og sigrar í mörgum bardögum, fær atgeirinn.", involved: ["Kolskeggur", "Vandill", "Karl", "Hallgrímur", "Kolskeggur (víkingur)", "Tófi"] },
        { id: 64, chapter: 31, character: "Gunnar Hámundarson", title: "Danmörk og Noregur", description: "Hittir Harald Gormsson og Hákon jarl.", involved: ["Haraldur Gormsson", "Hákon jarl", "Kolskeggur"] },
        { id: 65, chapter: 33, character: "Gunnar Hámundarson", title: "Biður Hallgerðar", description: "Hittir Hallgerði og biður hennar.", involved: ["Hallgerður", "Höskuldur", "Hrútur"] },
        { id: 66, chapter: 48, character: "Gunnar Hámundarson", title: "Slær Hallgerði", description: "Slær Hallgerði kinnhest vegna þjófnaðar.", involved: ["Hallgerður", "Melkólfur"] },
        { id: 67, chapter: 53, character: "Gunnar Hámundarson", title: "Særður af Otkeli", description: "Otkell ríður á hann og særir hann með spora.", involved: ["Otkell", "Skammkell"] },
        { id: 68, chapter: 54, character: "Gunnar Hámundarson", title: "Bardagi við Rangá", description: "Berst við Otkell og menn hans, drepur fjóra.", involved: ["Otkell", "Skammkell", "Hallbjörn hvíti", "Auðólfur", "Kolskeggur"] },
        { id: 69, chapter: 75, character: "Gunnar Hámundarson", title: "Snýr aftur", description: "Hættir við utanför, rýfur sætt.", involved: ["Kolskeggur", "Njáll (viðvörun)"] },
        { id: 70, chapter: 77, character: "Gunnar Hámundarson", title: "Síðasti bardagi og fall", description: "Ver sig einn á Hlíðarenda, fellur eftir hetjulega vörn.", involved: ["Hallgerður", "Rannveig", "Sámur (hundur)", "Gissur hvíti", "Mörður Valgarðsson", "Þorgrímur austmaður", "Þorbrandur Þorleiksson", "Ásbrandur Þorleiksson", "Grani Gunnarsson", "margir fleiri"] },

        // Njáll Þorgeirsson
        { id: 71, chapter: 20, character: "Njáll Þorgeirsson", title: "Kynning", description: "Lögmaður á Bergþórshvoli, vitur en skegglaus.", involved: ["Bergþóra"] },
        { id: 72, chapter: 21, character: "Njáll Þorgeirsson", title: "Ráðleggur Gunnari", description: "Gefur Gunnari ráð um málarekstur gegn Hrúti.", involved: ["Gunnar", "Unnur"] },
        { id: 73, chapter: 33, character: "Njáll Þorgeirsson", title: "Varar við Hallgerði", description: "Varar Gunnar við giftingunni við Hallgerði.", involved: ["Gunnar", "Hallgerður"] },
        { id: 74, chapter: 36, character: "Njáll Þorgeirsson", title: "Sættir Gunnar", description: "Tekur sjálfdæmi af Gunnari eftir víg Svarts.", involved: ["Gunnar", "Bergþóra", "Hallgerður", "Svartur"] },
        { id: 75, chapter: 94, character: "Njáll Þorgeirsson", title: "Tekur Höskuld í fóstur", description: "Tekur Höskuld Þráinsson í fóstur.", involved: ["Höskuldur Þráinsson", "Ketill í Mörk"] },
        { id: 76, chapter: 97, character: "Njáll Þorgeirsson", title: "Stofnar fimmtardóm", description: "Stendur fyrir stofnun fimmtardóms og fær Höskuldi goðorð.", involved: ["Höskuldur Þráinsson", "Skafti Þóroddsson", "margir höfðingjar"] },
        { id: 77, chapter: 111, character: "Njáll Þorgeirsson", title: "Harmar víg Höskulds", description: "Harmar mjög víg Höskulds fóstursonar síns.", involved: ["Höskuldur Þráinsson", "Skarphéðinn", "Grímur", "Helgi", "Kári"] },
        { id: 78, chapter: 122, character: "Njáll Þorgeirsson", title: "Leitar sátta", description: "Biður um sættir á Alþingi eftir víg Höskulds.", involved: ["Flosi", "Hallur af Síðu", "Skarphéðinn", "margir höfðingjar"] },
        { id: 79, chapter: 128, character: "Njáll Þorgeirsson", title: "Árásin á Bergþórshvol", description: "Ræður sonum sínum að verjast inni.", involved: ["Skarphéðinn", "Helgi", "Grímur", "Kári", "Bergþóra", "Flosi"] },
        { id: 80, chapter: 129, character: "Njáll Þorgeirsson", title: "Brennur inni", description: "Hafnar útgöngu og brennur inni með Bergþóru og Þórði Kárasyni.", involved: ["Bergþóra", "Þórður Kárason", "Flosi"] },

        // Kári Sölmundarson
        { id: 81, chapter: 84, character: "Kári Sölmundarson", title: "Kemur Njálssonum til hjálpar", description: "Bjargar Njálssonum frá víkingum í Skotlandsfjörðum.", involved: ["Grímur Njálsson", "Helgi Njálsson", "Grjótgarður", "Snækólfur"] },
        { id: 82, chapter: 85, character: "Kári Sölmundarson", title: "Hirðmaður Sigurðar jarls", description: "Fer með Njálssonum til Orkneyja og verður hirðmaður jarls.", involved: ["Grímur Njálsson", "Helgi Njálsson", "Sigurður jarl"] },
        { id: 83, chapter: 90, character: "Kári Sölmundarson", title: "Giftist Helgu", description: "Fer til Íslands, giftist Helgu Njálsdóttur.", involved: ["Helga Njálsdóttir", "Njáll", "Grímur Njálsson", "Helgi Njálsson"] },
        { id: 84, chapter: 92, character: "Kári Sölmundarson", title: "Víg Þráins", description: "Tekur þátt í vígi Þráins Sigfússonar.", involved: ["Þráinn Sigfússon", "Skarphéðinn", "Grímur Njálsson", "Helgi Njálsson", "Hrappur"] },
        { id: 85, chapter: 111, character: "Kári Sölmundarson", title: "Víg Höskulds", description: "Tekur þátt í vígi Höskulds Hvítanesgoða.", involved: ["Höskuldur Þráinsson", "Skarphéðinn", "Grímur Njálsson", "Helgi Njálsson", "Mörður Valgarðsson"] },
        { id: 86, chapter: 129, character: "Kári Sölmundarson", title: "Sleppur úr brennunni", description: "Sleppur einn karla úr brennunni á Bergþórshvoli.", involved: ["Skarphéðinn", "Grímur Njálsson", "Flosi"] },
        { id: 87, chapter: 146, character: "Kári Sölmundarson", title: "Hefndarför í Kerlingardal", description: "Fer með Þorgeiri skorargeir og drepur fimm brennumenn.", involved: ["Þorgeir skorargeir", "Mörður Sigfússon", "Sigurður Lambason", "margir fleiri"] },
        { id: 88, chapter: 151, character: "Kári Sölmundarson", title: "Hefndarför í Meðallandi", description: "Fer með Birni hvíta og drepur þrjá brennumenn.", involved: ["Björn hvíti", "Glúmur Hildisson", "Vébrandur Þorfinnsson", "Ásbrandur Þorfinnsson", "Ketill í Mörk"] },
        { id: 89, chapter: 155, character: "Kári Sölmundarson", title: "Drepur Gunnar Lambason", description: "Drepur Gunnar Lambason í höll Sigurðar jarls í Orkneyjum.", involved: ["Gunnar Lambason", "Sigurður jarl", "Flosi"] },
        { id: 90, chapter: 158, character: "Kári Sölmundarson", title: "Drepur Kol Þorsteinsson", description: "Drepur Kol Þorsteinsson í Bretlandi.", involved: ["Kolur Þorsteinsson"] },
        { id: 91, chapter: 159, character: "Kári Sölmundarson", title: "Sættist við Flosa", description: "Lendir í skipbroti, gengur á vald Flosa, sættist við hann og giftist Hildigunni.", involved: ["Flosi", "Hildigunnur"] },

        // Flosi Þórðarson
        { id: 92, chapter: 95, character: "Flosi Þórðarson", title: "Kynning", description: "Höfðingi á Svínafelli.", involved: ["Hildigunnur"] },
        { id: 93, chapter: 97, character: "Flosi Þórðarson", title: "Samþykkir bónorð", description: "Samþykkir bónorð Njáls fyrir Höskuld um Hildigunni.", involved: ["Njáll", "Höskuldur Þráinsson", "Hildigunnur"] },
        { id: 94, chapter: 116, character: "Flosi Þórðarson", title: "Eggjaður til hefnda", description: "Hildigunnur eggjar hann til að hefna Höskulds.", involved: ["Hildigunnur", "Höskuldur Þráinsson"] },
        { id: 95, chapter: 124, character: "Flosi Þórðarson", title: "Særist hefnda", description: "Sver eið með mönnum sínum um að hefna Höskulds eða falla.", involved: ["Sigfússynir", "Grani Gunnarsson", "margir fleiri"] },
        { id: 96, chapter: 128, character: "Flosi Þórðarson", title: "Árás á Bergþórshvol", description: "Leiðir árásina á Bergþórshvol og ákveður að brenna bæinn.", involved: ["Njáll", "Skarphéðinn", "margir fleiri"] },
        { id: 97, chapter: 129, character: "Flosi Þórðarson", title: "Drepur Helga", description: "Drepur Helga Njálsson er hann reynir að flýja.", involved: ["Helgi Njálsson"] },
        { id: 98, chapter: 131, character: "Flosi Þórðarson", title: "Særir Ingjald", description: "Særir Ingjald frá Keldum fyrir svik.", involved: ["Ingjaldur frá Keldum"] },
        { id: 99, chapter: 145, character: "Flosi Þórðarson", title: "Alþingisbardagi og sætt", description: "Tekur þátt í bardaga á Alþingi, sættist við flesta.", involved: ["Ásgrímur", "Gissur hvíti", "Hallur af Síðu", "Snorri goði", "Kári (ósáttur)", "Þorgeir skorargeir (ósáttur)"] },
        { id: 100, chapter: 153, character: "Flosi Þórðarson", title: "Utanför og skipbrot", description: "Fer utan í sekt, lendir í skipbroti í Orkneyjum.", involved: ["Sigurður jarl"] },
        { id: 101, chapter: 158, character: "Flosi Þórðarson", title: "Suðurganga", description: "Fer í suðurgöngu til Rómar.", involved: [] },
        { id: 102, chapter: 159, character: "Flosi Þórðarson", title: "Sættist við Kára", description: "Tekur við Kára eftir skipbrot, sættist við hann.", involved: ["Kári", "Hildigunnur"] },
        { id: 103, chapter: 159, character: "Flosi Þórðarson", title: "Andlát", description: "Týnist á hafi úti í elli.", involved: [] },

        // Hér vantar marga atburði fyrir aðrar mikilvægar persónur eins og Þorgeir Skorargeir o.fl.
        // og síðari hluta sögunnar.
    ];

    // --- Föll (Functions) ---

    // Býr til HTML fyrir hvern atburð
    function createEventElement(event, index) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('timeline-event');
        // Skiptir hliðum á tímalínu
        eventDiv.classList.add(index % 2 === 0 ? 'left' : 'right');
        // Bætir við flokkum fyrir hverja persónu sem tengist atburðinum
        eventDiv.classList.add(`char-${event.character.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
        event.involved.forEach(involvedChar => {
             eventDiv.classList.add(`involved-${involvedChar.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
        });
        eventDiv.dataset.id = event.id; // Geymir ID fyrir modal

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('event-content');

        const title = document.createElement('h3');
        title.textContent = event.title;
        contentDiv.appendChild(title);

        const chapterSpan = document.createElement('span');
        chapterSpan.classList.add('chapter');
        chapterSpan.textContent = `Kafli: ${event.chapter}`;
        contentDiv.appendChild(chapterSpan);

        const characterSpan = document.createElement('span');
        characterSpan.classList.add('character-name'); // Gefum þessu sér class
        characterSpan.textContent = `Aðalpersóna: ${event.character}`;
        contentDiv.appendChild(characterSpan);


        const involvedSpan = document.createElement('span');
        involvedSpan.classList.add('involved');
        involvedSpan.textContent = `Aðrir nefndir: ${event.involved.join(', ') || 'Engir'}`;
        contentDiv.appendChild(involvedSpan);

        eventDiv.appendChild(contentDiv);

        // Smellivirkni fyrir modal
        contentDiv.addEventListener('click', () => showModal(event.id));

        return eventDiv;
    }

    // Sýnir modal með upplýsingum um atburð
    function showModal(eventId) {
        const eventData = timelineData.find(event => event.id === eventId);
        if (eventData) {
            modalTitle.textContent = `${eventData.title} (${eventData.character})`;
            modalChapter.textContent = eventData.chapter;
            modalDescription.textContent = eventData.description;
            modalInvolved.textContent = eventData.involved.join(', ') || 'Engir';
            modal.style.display = 'block';
        }
    }

    // Lokar modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Sækir allar einstakar aðalpersónur úr gögnunum
    function getUniqueCharacters(data) {
        const characters = new Set();
        data.forEach(event => characters.add(event.character));
        return Array.from(characters).sort(); // Raðar í stafrófsröð
    }

    // Býr til valkosti fyrir síunar fellilistann
    function populateFilterOptions(characters) {
        characters.forEach(char => {
            const option = document.createElement('option');
            option.value = char.toLowerCase().replace(/[^a-z0-9]/g, '-'); // Býr til öruggt gildi
            option.textContent = char;
            filterSelect.appendChild(option);
        });
    }

    // Síar tímalínuna eftir valinni persónu
    function filterTimeline() {
        const selectedValue = filterSelect.value;
        const allEvents = timeline.querySelectorAll('.timeline-event');

        allEvents.forEach(eventElement => {
            const contentElement = eventElement.querySelector('.event-content');
            // Fjarlægir fyrri áherslur
            eventElement.classList.remove('highlight', 'dimmed');
            contentElement.classList.remove('highlight-content');

            if (selectedValue === 'all') {
                // Sýna alla eðlilega
            } else {
                // Athugar hvort atburðurinn tilheyri völdum persónu
                if (eventElement.classList.contains(`char-${selectedValue}`)) {
                    eventElement.classList.add('highlight');
                    contentElement.classList.add('highlight-content');
                } else {
                    eventElement.classList.add('dimmed'); // Daufar aðra
                }
            }
        });
    }

    // --- Frumstilling ---

    // Búa til tímalínu atburði
    timelineData.forEach((event, index) => {
        timeline.appendChild(createEventElement(event, index));
    });

    // Búa til síunarvalkosti
    const uniqueCharacters = getUniqueCharacters(timelineData);
    populateFilterOptions(uniqueCharacters);

    // Bæta við virkni fyrir síuna
    filterSelect.addEventListener('change', filterTimeline);

    // Bæta við virkni fyrir lokunarhnapp á modal
    closeButton.addEventListener('click', closeModal);

    // Loka modal ef smellt er utan þess
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

     // Loka modal með Escape takka
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

});