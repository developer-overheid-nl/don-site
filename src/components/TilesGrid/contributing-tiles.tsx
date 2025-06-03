import type React from "react";
import IconIct from "@site/src/theme/icons/IconIct";

import { GridTile  } from ".";

const tiles: GridTile[] = [
    {
        // PNG_verzenden_Zwart.png
        icon: <IconIct />,
        title: 'Dien een issue in',
        description: ' Heb je een idee voor een artikel of feature? Heb je een bug gevonden? Dien een issue in.',
        link: 'https://github.com/developer-overheid-nl/don-site/issues/new',
        external: true
    },
    {
        // PNG_tekstballon-met-potlood_Zwart.png
        icon: <IconIct />,
        title: 'Schrijf een gastblog',
        description: ' Het schrijven van een gastblog is een effectieve manier om je kennis te delen met de community.',
        link: '/contributing/gastblog-schrijven',
    },
    {
        // PNG_3-boeken-achter-elkaar_Zwart.png
        icon: <IconIct />,
        title: 'Kennisbankartikel toevoegen',
        description: 'Heb jij een tutorial of artikel die je graag wilt toevoegen aan onze kennisbank?',
        link: '/contributing/kennisbank-artikel',
    },
    {
        // PNG_api-inrichting_Zwart.png
        icon: <IconIct />,
        title: 'API toevoegen',
        description: 'Heb jij een nuttige API in je organisatie? Voeg deze toe aan het API-register.',
        link: 'https://apis.developer.overheid.nl/apis/toevoegen',
    },
    {
        // PNG_doos-met-pijlen-op-zijkant-zijaanzicht_Zwart.png
        icon: <IconIct />,
        title: 'Repository toevoegen',
        description: 'Heb jij waardevolle repositories? Voeg deze toe aan het Open Source Software-register.',
        link: 'https://oss.developer.overheid.nl/apis/toevoegen',
    },
    {
        // 'PNG_tekstballonnen-met-vraagteken_Zwart.png' 
        icon: <IconIct />,
        title: 'Word lid van onze Slack',
        description: 'Een inhoudelijke vraag over onze tools of standaarden? Stel deze in onze Slack-groep.',
        link: 'https://codefornl.slack.com/archives/CFV4B3XE2',
        external: true
    },
    {
        // 'PNG_netwerk_Zwart.png' 
        icon: <IconIct />,
        title: 'Volg ons op Mastodon',
        description: 'Wil je in gesprek met andere developers en ons? Volg ons op Mastodon.',
        link: 'https://social.overheid.nl/@developer',
        external: true
    },
    {
        // 'PNG_megafoon_Zwart.png',
        icon: <IconIct />,
        title: 'Volg ons op LinkedIn',
        description: 'Op de hoogte blijven van de laatste ontwikkelingen? Volg ons op LinkedIn.',
        link: 'https://www.linkedin.com/company/92926607/',
        external: true
    },
];

export default tiles;
