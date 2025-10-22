import React from "react";

import ContributingTilesArray from "../TilesGrid/contributing-tiles";
import TilesGrid from "../TilesGrid";

export default function ContributingTiles(): React.ReactNode {
  return <TilesGrid tiles={ContributingTilesArray} />;
}
