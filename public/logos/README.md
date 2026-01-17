# Virksomhedslogoer

Placer dine virksomhedslogoer her i følgende format:

```
company-1.png
company-2.png
company-3.png
...osv
```

## Anbefalede specs:
- Format: PNG med transparent baggrund
- Bredde: 200-400px
- Højde: 100-200px
- Mørke logoer fungerer bedst (eller hvide med transparent baggrund)

## Sådan tilføjer du logoer:

1. Placer dine logo-filer i denne mappe
2. Åbn `components/LogoCarousel.tsx`
3. Opdater `COMPANY_LOGOS` arrayet med dine filnavne og virksomhedsnavne
4. Uncomment Image komponenten og comment placeholder div'en ud

Eksempel:
```typescript
const COMPANY_LOGOS = [
  { name: "Microsoft", path: "/logos/microsoft.png" },
  { name: "Google", path: "/logos/google.png" },
  // ...flere virksomheder
];
```
