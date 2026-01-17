import { Thing, WithContext, Graph } from "schema-dts";

type SchemaType = WithContext<Thing> | Graph | Record<string, unknown>;

interface JsonLdProps {
  schema: SchemaType;
}

/**
 * JsonLd Component
 *
 * Renderer struktureret data som JSON-LD script tag.
 * Understøtter både enkelt schema og @graph strukturer.
 */
export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
