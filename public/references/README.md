# Referencer Profilbilleder

Denne mappe indeholder profilbilleder til referencer på `/referencer` siden.

## Struktur

```
references/
├── linkedin/          # LinkedIn profil billeder
│   ├── susanne-nielsen.jpg
│   ├── niels-hermansen.jpg
│   ├── lars-skjoldby.jpg
│   ├── hannibal-herforth.jpg
│   ├── kim-sonne.jpg
│   └── mathias-chr-hansen.jpg
│
└── trustpilot/        # Trustpilot profil billeder
    ├── rida.jpg
    ├── kristian-krogh-bang.jpg
    ├── bejer.jpg
    ├── lui-hoyer.jpg
    ├── mogens-kramtoft.jpg
    └── meta-hojholdt.jpg
```

## Sådan tilføjer du billeder

### LinkedIn Profilbilleder

1. Gå til personens LinkedIn profil
2. Højreklik på deres profilbillede og vælg "Gem billede som..."
3. Gem billedet i `public/references/linkedin/` mappen
4. Omdøb filen til at matche navnet i `app/referencer/page.tsx` (f.eks. `susanne-nielsen.jpg`)

### Trustpilot Profilbilleder

1. Gå til review'et på Trustpilot (brug URL'en fra `TRUSTPILOT_REVIEWS` arrayet)
2. Hvis der er et profilbillede, højreklik og vælg "Gem billede som..."
3. Gem billedet i `public/references/trustpilot/` mappen
4. Omdøb filen til at matche navnet i `app/referencer/page.tsx` (f.eks. `rida.jpg`)

## Billedformater

- **Anbefalede formater**: JPG, PNG, eller WebP
- **Anbefalet størrelse**: 200x200px til 400x400px (kvadratisk)
- **Max filstørrelse**: Hold billederne under 100KB hvis muligt

## Fallback Avatar

Hvis et billede ikke findes, viser Avatar komponenten automatisk:
- Personens initialer
- En farvet baggrund (genereret konsistent fra navnet)

Dette sikrer at siden altid ser professionel ud, selv uden billeder.

## Opdatering af stier

Hvis du ændrer filnavne, husk også at opdatere `avatar` feltet i:
- `LINKEDIN_MENTIONS` arrayet (linje ~36-85)
- `TRUSTPILOT_REVIEWS` arrayet (linje ~88-137)

i `app/referenser/page.tsx`
