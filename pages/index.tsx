import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/index.module.scss";

import Navbar from "@/components/Navbar/Navbar";
import Searchbar from "@/components/Searchbar/Searchbar";
import SearchResult from "@/components/SearchResult/SearchResult";
import AnalysisView from "@/components/AnalysisView/AnalysisView";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import { useEffect, useState } from "react";

import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchBarText, setSearchBarText] = useState("");
  const [results, setResults] = useState([]);
  const [currentRxcui, setCurrentRxcui] = useState("00000");
  const [currentRxName, setCurrentRxName] = useState("No Drug Selected");
  const [currentInteractionSet, setCurrentInteractionSet] = useState(new Set());

  const handleSearchButton = () => {
    axios
      .get(`/api/FindDrug/`, { params: { target: searchBarText } })
      .then((res) => {
        setResults(res.data.drugGroup.conceptGroup[1].conceptProperties);
      });
  };

  const handleSearchInput = (e: any) => {
    setSearchBarText(e.target.value);
  };

  useEffect(() => {
    if (currentRxcui === "00000") {
      return;
    }
    axios
      .get(`https://rxnav.nlm.nih.gov/REST/rxcui/${currentRxcui}.json`)
      .then((res) => {
        setCurrentRxName(res.data.idGroup.name);
      });
    axios
      .get(
        `https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${currentRxcui}`
      )
      .then((res) => {
        const flattenedObj = flattenObject(res.data);
        for (const [key, value] of Object.entries(flattenedObj)) {
          if (key.includes("minConceptItem.name")) {
            setCurrentInteractionSet(
              (previousState) => new Set([...currentInteractionSet, value])
            );
          }
        }
        console.log(currentInteractionSet);
      });
  }, [currentRxcui]);

  const flattenObject = function (data) {
    var result = {};
    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + "[" + i + "]");
        if (l == 0) result[prop] = [];
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + "." + p : p);
        }
        if (isEmpty && prop) result[prop] = {};
      }
    }
    recurse(data, "");
    return result;
  };

  return (
    <div className={inter.className}>
      <Head>
        <title>RXify</title>
        <meta name="description" content="What's that drug?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <>
          <div className={styles.searchPanel}>
            <div className={styles.searchStack}>
              <Navbar />
              <Searchbar
                onClick={handleSearchButton}
                onChange={handleSearchInput}
              />
            </div>
            <ScrollArea.Root className={styles.resultsScrollAreaRoot}>
              <ScrollArea.Viewport>
                <div className={styles.resultsStack}>
                  {results.map((item, i) => {
                    return (
                      <SearchResult
                        key={i}
                        title={item.name}
                        setState={setCurrentRxcui}
                        rxcui={item.rxcui}
                        targetSet={setCurrentInteractionSet}
                      />
                    );
                  })}
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="ScrollAreaCorner" />
            </ScrollArea.Root>
          </div>
          <div className={styles.analysisPanel}>
            <AnalysisView
              rxname={currentRxName}
              rxcui={currentRxcui}
              interactions={currentInteractionSet}
            />
          </div>
        </>
      </main>
    </div>
  );
}
