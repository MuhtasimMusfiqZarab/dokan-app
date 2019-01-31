/** @format */

import { AppRegistry, YellowBox } from "react-native";
import ReduxWrapper from "./src/ReduxWrapper";

YellowBox.ignoreWarnings(['Remote debugger']);

AppRegistry.registerComponent("Dokan", () => ReduxWrapper);