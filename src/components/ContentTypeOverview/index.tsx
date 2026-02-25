import React, { useState, useMemo } from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

interface DocEntry {
  id: string;
  title: string;
  description: string;
  contentType: string;
  tags: string[];
  category: string;
  path: string;
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
  standaard: "Standaarden",
  tool: "Tools",
  tutorial: "Tutorials",
  architectuur: "Architectuur",
  richtlijn: "Richtlijnen",
};

interface ContentTypeOverviewProps {
  contentType?: string;
  showFilter?: boolean;
  title?: string;
  description?: string;
}

export default function ContentTypeOverview({
  contentType,
  showFilter = false,
  title,
  description,
}: ContentTypeOverviewProps): React.JSX.Element {
  const pluginData = usePluginData("content-type-index") as {
    contentTypeIndex: DocEntry[];
  };

  const allDocs = pluginData?.contentTypeIndex ?? [];
  const [selectedType, setSelectedType] = useState<string>(contentType || "");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = useMemo(() => {
    let docs = allDocs;

    const activeType = contentType || selectedType;
    if (activeType) {
      docs = docs.filter((doc) => doc.contentType === activeType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query),
      );
    }

    return docs;
  }, [allDocs, contentType, selectedType, searchQuery]);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, DocEntry[]> = {};
    for (const doc of filteredDocs) {
      const cat = doc.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(doc);
    }
    // Sort docs within each group alphabetically
    for (const cat of Object.keys(groups)) {
      groups[cat].sort((a, b) => a.title.localeCompare(b.title, "nl"));
    }
    return groups;
  }, [filteredDocs]);

  const availableTypes = useMemo(() => {
    const types = new Set(allDocs.map((d) => d.contentType));
    return Array.from(types).sort();
  }, [allDocs]);

  return (
    <div className={styles.overview}>
      {title && <h1>{title}</h1>}
      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.controls}>
        {showFilter && (
          <div className={styles.filterGroup}>
            <label htmlFor="type-filter">Content type:</label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={styles.select}
            >
              <option value="">Alle types</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {CONTENT_TYPE_LABELS[type] || type}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className={styles.filterGroup}>
          <label htmlFor="search-filter">Zoeken:</label>
          <input
            id="search-filter"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Zoek op titel of beschrijving..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <p className={styles.resultCount}>
        {filteredDocs.length} artikel{filteredDocs.length !== 1 ? "en" : ""}{" "}
        gevonden
      </p>

      {Object.entries(groupedByCategory).map(([category, docs]) => (
        <div key={category} className={styles.categoryGroup}>
          <h2 className={styles.categoryTitle}>
            {CATEGORY_LABELS[category] || category}
          </h2>
          <div className={styles.cardGrid}>
            {docs.map((doc) => (
              <Link key={doc.id} to={doc.path} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>{doc.title}</span>
                  <span
                    className={`${styles.badge} ${styles[`badge--${doc.contentType}`]}`}
                  >
                    {doc.contentType}
                  </span>
                </div>
                {doc.description && (
                  <p className={styles.cardDescription}>{doc.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}

      {filteredDocs.length === 0 && (
        <p className={styles.noResults}>
          Geen artikelen gevonden. Probeer een andere zoekopdracht.
        </p>
      )}
    </div>
  );
}
