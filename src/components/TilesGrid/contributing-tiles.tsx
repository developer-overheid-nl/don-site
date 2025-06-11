import type React from "react";
import { GridTile  } from ".";
import IconVerzenden from "@site/src/theme/icons/IconVerzenden";
import IconTekstballonMetPotlood from "@site/src/theme/icons/IconTekstballonMetPotlood";
import Icon3BoekenAchterElkaar from "@site/src/theme/icons/Icon3BoekenAchterElkaar";
import IconApiInrichting from "@site/src/theme/icons/IconApiInrichting";
import IconDoosMetPijlenOpZijkantZijaanzicht from "@site/src/theme/icons/IconDoosMetPijlenOpZijkantZijaanzicht";
import IconTekstballonnenMetVraagteken from "@site/src/theme/icons/IconTekstballonnenMetVraagteken";
import IconNetwerk from "@site/src/theme/icons/IconNetwerk";
import IconMegafoon from "@site/src/theme/icons/IconMegafoon";

const tiles: GridTile[] = [
    {
        icon: <IconVerzenden />,
        title: 'Dien een issue in',
        description: 'Heb je een idee voor een artikel of feature? Of heb je een bug gevonden? Dien een issue in op onze Github.',
        link: 'https://github.com/developer-overheid-nl/don-site/issues/new',
        external: true
    },
    {
        icon: <IconTekstballonMetPotlood />,
        title: 'Schrijf een gastblog',
        description: 'Het schrijven van een gastblog is een effectieve manier om je kennis te delen met de community.',
        link: '/contributing/gastblog-schrijven',
    },
    {
        icon: <Icon3BoekenAchterElkaar />,
        title: 'Kennisbankartikel toevoegen',
        description: 'Heb jij een tutorial of artikel die je graag wilt toevoegen aan onze kennisbank?',
        link: '/contributing/kennisbank-artikel',
    },
    {
        icon: <IconApiInrichting />,
        title: 'API toevoegen',
        description: 'Heb jij een nuttige API in je organisatie? Voeg deze toe aan het API-register.',
        link: 'https://apis.developer.overheid.nl/apis/toevoegen',
    },
    {
        icon: <IconDoosMetPijlenOpZijkantZijaanzicht />,
        title: 'Repository toevoegen',
        description: 'Heb jij waardevolle repositories? Voeg deze toe aan het Open Source Software-register.',
        link: 'https://oss.developer.overheid.nl/apis/toevoegen',
    },
    {
        icon: <IconTekstballonnenMetVraagteken />,
        title: 'Naar onze Slack',
        description: 'Heb je een inhoudelijke vraag over onze tools of standaarden? Stel deze in onze Slack-groep.',
        link: 'https://codefornl.slack.com/archives/CFV4B3XE2',
        external: true
    },
    {
        icon: <IconNetwerk />,
        title: 'Volg ons op Mastodon',
        description: 'Wil je in gesprek met andere developers en ons? Volg ons op Mastodon.',
        link: 'https://social.overheid.nl/@developer',
        external: true
    },
    {
        icon: <IconMegafoon />,
        title: 'Volg ons op LinkedIn',
        description: 'Op de hoogte blijven van de laatste ontwikkelingen? Volg ons op LinkedIn.',
        link: 'https://www.linkedin.com/company/92926607/',
        external: true
    },
];

export default tiles;
