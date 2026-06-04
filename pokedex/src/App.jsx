import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import styles from "./App.module.css";
import { usePokemon } from "./hooks/usePokemon";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { Card } from "./components/Card";
import { Modal } from "./components/Modal";
import { SearchBar } from "./components/SearchBar";
import { TypeFilter } from "./components/TypeFilter";

function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [activeTypes, setActiveTypes] = useState(new Set());
  const { pokemon, loading, error } = usePokemon();

  const allTypes = useMemo(() => {
    const set = new Set();
    pokemon.forEach((p) => p.types.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [pokemon]);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) => {
      const query = search.trim().toLowerCase();

      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        String(p.id).padStart(3, "0").includes(query.replace("#", ""));

      const matchType =
        activeTypes.size === 0 ||
        [...activeTypes].every((type) => p.types.includes(type));

      return matchSearch && matchType;
    });
  }, [pokemon, search, activeTypes]);

  const toggleType = (type) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);

      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }

      return next;
    });
  };

  const clearTypes = () => {
    setActiveTypes(new Set());
  };

  const { visible, hasMore, pageRef, reset } = useInfiniteScroll(
    filteredPokemon,
    24,
  );
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className={styles.app}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              <img src="./pokeball.png" className={styles.imageLogo} />
              <div>
                <h1 className={styles.title}>Pokédex</h1>
                <p className={styles.subtitle}>
                  {loading
                    ? "Loading Pokémon..."
                    : error
                      ? "Failed to load"
                      : `${filteredPokemon.length} of ${pokemon.length} Pokémon`}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          {error && (
            <div className={styles.error} role="alert">
              <strong>Error:</strong> {String(error.message || error)}
            </div>
          )}

          {loading ? (
            <div className={styles.loadingScreen} aria-live="polite">
              <div className={styles.spinner}>
                <div className={styles.spinnerin}></div>
              </div>
              <p className={styles.loadingText}>Loading Pokémon data...</p>
            </div>
          ) : (
            <>
              <div className={styles.controls}>
                <SearchBar search={search} onSearch={setSearch} />
              </div>

              <div className={styles.filterWrap}>
                <TypeFilter
                  allTypes={allTypes}
                  activeTypes={activeTypes}
                  onToggle={toggleType}
                  onClear={clearTypes}
                />
              </div>

              {filteredPokemon.length === 0 ? (
                <div className={styles.empty} role="status">
                  <p>No Pokémon found for that search.</p>
                </div>
              ) : (
                <>
                  <div className={styles.grid}>
                    {visible.map((p) => (
                      <Card key={p.id} pokemon={p} onClick={setSelected} />
                    ))}
                  </div>
                  <div ref={pageRef} className={styles.sentinel}>
                    {hasMore && (
                      <span className={styles.loadMore}>Loading more...</span>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </main>

        {selected && (
          <Modal pokemon={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </>
  );
}

export default App;
