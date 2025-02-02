/*
 * Copyright 2017-2021 Elyra Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import { CommonCanvas, CanvasController } from "common-canvas"; // eslint-disable-line import/no-unresolved
import ExplainCanvasFlow from "./explainCanvas.json";


export default class ExplainCanvas extends React.Component {
	constructor(props) {
		super(props);

		this.canvasController = new CanvasController();
		this.canvasController.setPipelineFlow(ExplainCanvasFlow);

		this.config = Object.assign({}, props.config, {
			enableParentClass: "explain",
			enableLinkType: "Straight",
			enableNodeLayout:
			{
				defaultNodeWidth: 120,
				defaultNodeHeight: 60,
				drawNodeLinkLineFromTo: "node_center",
				labelPosX: 52,
				labelPosY: 14,
				labelWidth: 200,
				labelHeight: 38,
				ellipsisDisplay: true,
				ellipsisPosX: 100,
				ellipsisPosY: 19,
				inputPortDisplay: false,
				outputPortDisplay: false
			}
		});
	}


	layoutHandler(data) {
		const labLen = data.label ? data.label.length : 0;
		let width = 120;
		let bodyPath = "";
		let selectionPath = "";

		switch (data.op) {
		case "rectangle": {
			bodyPath = "     M  0 0  L  0 60 120 60 120  0  0  0 Z";
			selectionPath = "M -5 -5 L -5 65 125 65 125 -5 -5 -5 Z";
			break;
		}
		case "pentagon": {
			bodyPath = "     M  0 20 L  0 60 120 60 120 20 60  0  0 20 Z";
			selectionPath = "M -5 17 L -5 65 125 65 125 17 60 -5 -5 17 Z";
			break;
		}
		case "octagon": {
			bodyPath = "     M  0 20 L  0 40  20 60 100 60 120 40 120 20 100 0  20  0 Z";
			selectionPath = "M -5 20 L -5 40  20 65 100 65 125 40 125 20 100 -5 20 -5 Z";
			break;
		}
		case "ellipse": {
			bodyPath = "     M  0 30 Q  0  0 60  0 Q 120  0 120 30 Q 120 60 60 60 Q  0 60  0 30 Z";
			selectionPath = "M -5 30 Q -5 -5 60 -5 Q 125 -5 125 30 Q 125 65 60 65 Q -5 65 -5 30 Z";
			break;
		}
		case "triangle": {
			bodyPath = "     M   0 60 L  140 60 70  0 0 60 Z";
			selectionPath = "M  -5 65 L  145 65 70 -5 5 65 Z";
			break;
		}
		case "hexagon": {
			width = (labLen * 9) + 60; // Allow 9 pixels for each character
			const corner = width - 30;
			bodyPath = `     M   0 30 L 30 60 ${corner} 60 ${width}     30 ${corner}  0 30  0 Z`;
			selectionPath = `M  -5 30 L 30 65 ${corner} 65 ${width + 5} 30 ${corner} -5 30 -5 Z`;
			break;
		}
		default:
			return {};
		}

		const nodeFormat = {
			defaultNodeWidth: width, // Override default width with calculated width
			labelPosX: (width / 2), // Specify center of label as center of node Note: text-align is set to center in the CSS for this label
			labelWidth: width, // Set big enough so that label is not truncated and so no ... appears
			ellipsisPosX: width - 25, // Always position 25px in from the right side
			bodyPath: bodyPath,
			selectionPath: selectionPath
		};

		return nodeFormat;
	}

	render() {
		return (
			<CommonCanvas
				canvasController={this.canvasController}
				config={this.config}
				layoutHandler={this.layoutHandler}
			/>
		);
	}
}

ExplainCanvas.propTypes = {
	config: PropTypes.object
};
