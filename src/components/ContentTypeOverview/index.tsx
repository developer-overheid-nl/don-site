import { usePluginData } from "@docusaurus/useGlobalData";
import { useState, useMemo } from "react";
import styles from "./styles.module.css";

interface ContentItem {
  title: string;
  description: string;
  contentType: string;
  tags: string[];
  category: string;
  url: string;
}

interface Props {
  contentType?: string;
  showFilter?: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  "api-ontwikkeling": "API Ontwikkeling",
  "front-end": "Front-end",
  data: "Data & Interoperabiliteit",
  security: "Security",
  devops: "DevOps & Platform",
  "open-source": "Open Source",
  leidraad: "Leidraad",
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  standaard: "Standaard",
  tool: "Tool",
  tutorial: "Tutorial",
  architectuur: "Architectuur",
  richtlijn: "Richtlijn",
};

const nlCollator = new Intl.Collator("nl");

function Badge({ contentType }: { contentType: string }) {
  const modifierClass = styles[`badge--${contentType}`];
  return (
    <span className={`${styles.badge}${modifierClass ? ` ${modifierClass}` : ""}`}>
      {CONTENT_TYPE_LABELS[contentType] || contentType}
    </span>
  );
}

export default function ContentTypeOverview({
  contentType,
  showFilter = false,
}: Props) {
  const allItems = usePluginData("content-type-index") as ContentItem[];
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState(contentType || "");

  const filtered = useMemo(() => {
    let items = allItems;

    if (filterType) {
      items = items.filter((item) => item.contentType === filterType);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      );
    }

    return items;
  }, [allItems, filterType, search]);

  const grouped = useMemo(() => {
    const groups: Record<string, ContentItem[]> = {};
    for (const item of filtered) {
      const key = item.category;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    }

    // Sort items within each group
    for (const key of Object.keys(groups)) {
      groups[key].sort((a, b) => nlCollator.compare(a.title, b.title));
    }

    // Sort groups by label
    const sortedKeys = Object.keys(groups).sort((a, b) =>
      nlCollator.compare(
        CATEGORY_LABELS[a] || a,
        CATEGORY_LABELS[b] || b,
      ),
    );

    return sortedKeys.map((key) => ({
      key,
      label: CATEGORY_LABELS[key] || key,
      items: groups[key],
    }));
  }, [filtered]);

  return (
    <div>
      <div className={styles.filterRow}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Zoek op titel of beschrijving..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {showFilter && (
          <select
            className={styles.filterSelect}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Alle types</option>
            {Object.entries(CONTENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}
      </div>

      <p className={styles.resultCount}>{filtered.length} resultaten</p>

      {grouped.length === 0 && (
        <p className={styles.noResults}>Geen resultaten gevonden.</p>
      )}

      {grouped.map((group) => (
        <div key={group.key} className={styles.categorySection}>
          <h2 className={styles.categoryHeading}>{group.label}</h2>
          <div className={styles.grid}>
            {group.items.map((item) => (
              <div key={item.url} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <a href={item.url}>{item.title}</a>
                  </h3>
                  <Badge contentType={item.contentType} />
                </div>
                {item.description && (
                  <p className={styles.cardDescription}>{item.description}</p>
                )}
                {item.tags.length > 0 && (
                  <div className={styles.tags}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
