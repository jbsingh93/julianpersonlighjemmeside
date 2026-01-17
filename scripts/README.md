# Schema Validation Script

Automatisk validering af Schema.org markup på alle sider.

## Usage

### Valider alle sider
```bash
npm run validate-schema
```

### Valider specifik side
```bash
npm run validate-schema ai-kurser
npm run validate-schema om
npm run validate-schema invester
```

## Hvad scriptet tjekker

✅ **Finder alle sider** med schema markup
✅ **Viser schema typer** for hver side
✅ **Advarer om problemer:**
  - Hardcoded @id værdier (bør bruge `personRef()` eller `orgRef()`)
  - Manglende imports af reference funktioner
  - Inkonsistent brug af entity references

✅ **Giver actionable fixes** for problemer

## Output eksempel

```
Schema.org Validation

Found 14 page files

✓ /ai-ydelser/fysiske-ai-kurser
  Types: Service, Offer, ItemList, Course, CourseInstance

✓ /om
  Types: AboutPage, Person, Article

Summary

Total pages analyzed: 14
Pages with schema: 14
Pages with issues: 0

✓ All schema markup looks good!
```

## Fejltyper

### ⚠️ Warning (gul)
Problemer der kan forbedres, men ikke bryder schema:
- Hardcoded @id værdier
- Brug af `SCHEMA_IDS.person` i stedet for `personRef()`

### ✗ Error (rød)
Alvorlige problemer der skal fixes:
- Manglende imports af nødvendige funktioner
- Reference til entities uden at bruge helper functions

## Integration i CI/CD

Tilføj til din build process:

```json
{
  "scripts": {
    "prebuild": "npm run validate-schema",
    "build": "next build"
  }
}
```

Dette vil sikre at schema altid er valid før deployment.

## Manual validation

Scriptet giver dig instruktioner til at validere manuelt:

1. Kør `npm run dev`
2. Besøg siden i browser
3. View Source
4. Kopier JSON-LD fra `<script type="application/ld+json">`
5. Indsæt i https://validator.schema.org/

## SEO strategi

Dette script følger SEO strategien i `prd/seo-strategi/sammenfattet-seo-strategi.md`:

- **Entity Clarity**: Sikrer konsistent brug af @id'er
- **Reference Functions**: Validerer brug af `personRef()` og `orgRef()`
- **Best Practices**: Tjekker for hardcodede værdier og manglende imports

## Troubleshooting

### "No pages found matching"
- Prøv at bruge path uden initial slash: `npm run validate-schema om` i stedet for `npm run validate-schema /om`
- Path matching bruger substring match, så `ai-kurser` finder både `/ai-ydelser/fysiske-ai-kurser` og `/ai-ydelser/online-ai-kurser`

### "No schema found"
Siden har ikke schema markup. Dette er OK for nogle sider, men vigtige sider (ydelser, om, referencer) bør have schema.
