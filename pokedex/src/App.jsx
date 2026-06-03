import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import styles from "./App.module.css";
import { usePokemon } from "./hooks/usePokemon";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { Card } from "./components/Card";
import { Modal } from "./components/Modal";

function App() {
  const [count, setCount] = useState(0);
  const { pokemon, loading, error } = usePokemon();
  const { visible, hasMore, pageRef, reset } = useInfiniteScroll(pokemon, 24);
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
                {/* <p className={styles.subtitle}>
                  {loading
                    ? "Loading Pokémon..."
                    : error
                      ? "Failed to load"
                      : `${filtered.length} of ${pokemon.length} Pokémon`}
                </p> */}
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
                {/* <SearchBar
                  search={filters.search}
                  sort={filters.sort}
                  onSearch={setSearch}
                  onSort={setSort}
                /> */}
              </div>

              <div className={styles.filterWrap}>
                {/* <TypeFilter
                  allTypes={allTypes}
                  activeTypes={filters.types}
                  onToggle={toggleType}
                  onClear={clearTypes}
                /> */}
              </div>

              {pokemon.length === 0 ? (
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
                  <div
                    ref={pageRef}
                    className={styles.sentinel}
                    aria-hidden="true"
                  >
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
