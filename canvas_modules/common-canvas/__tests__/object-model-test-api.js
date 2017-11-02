/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* eslint no-console: "off" */

import log4js from "log4js";
import deepFreeze from "deep-freeze";
import { expect } from "chai";
import _ from "underscore";
import initialCanvas from "./test_resources/json/startCanvas.json";
import startPipelineFlow from "./test_resources/json/startPipelineFlow.json";
import paletteJson from "./test_resources/json/testPalette.json";
import filterNode from "./test_resources/json/filterNode.json";
import horizontalLayoutCanvas from "./test_resources/json/horizontalLayoutCanvas.json";
import verticalLayoutCanvas from "./test_resources/json/verticalLayoutCanvas.json";
import addNodeHorizontalLayoutCanvas from "./test_resources/json/addNodeHorizontalLayoutCanvas.json";
import addNodeVerticalLayoutCanvas from "./test_resources/json/addNodeVerticalLayoutCanvas.json";
import moveVarNode from "./test_resources/json/moveVarNode.json";
import moveNodeHorizontalLayoutCanvas from "./test_resources/json/moveNodeHorizontalLayoutCanvas.json";
import moveNodeVerticalLayoutCanvas from "./test_resources/json/moveNodeVerticalLayoutCanvas.json";
import nodeParameters from "./test_resources/json/nodeParameters.json";
import nodeParameterAddedPipelineFlow from "./test_resources/json/nodeParameterAddedPipelineFlow.json";


import ObjectModel from "../src/object-model/object-model.js";
import { NONE, VERTICAL, HORIZONTAL } from "../constants/common-constants.js";

const logger = log4js.getLogger("object-model-test");

describe("ObjectModel API handle model OK", () => {

	it("should layout a canvas horiziontally", () => {
		logger.info("should layout a canvas horiziontally");

		const startCanvas = initialCanvas;

		deepFreeze(startCanvas);

		ObjectModel.setCanvasInfo(startCanvas);
		ObjectModel.fixedAutoLayout(HORIZONTAL);
		ObjectModel.setPipelineFlowPalette(paletteJson);
		const node = ObjectModel.createNode(filterNode);
		ObjectModel.addNode(node);

		const expectedCanvas = addNodeHorizontalLayoutCanvas;
		const actualCanvas = ObjectModel.getCanvasInfo();

		// Delete ID because IDs are generated at runtime and therefore won't be
		// the same between expected and actual.
		delete actualCanvas.nodes[3].id;

		// logger.info("Expected Canvas = " + JSON.stringify(expectedCanvas, null, 2));
		// logger.info("Actual Canvas   = " + JSON.stringify(actualCanvas, null, 2));

		expect(_.isEqual(expectedCanvas, actualCanvas)).to.be.true;


	});

	it("should layout a canvas vertically", () => {
		logger.info("should layout a canvas vertically");

		const startCanvas = initialCanvas;

		deepFreeze(startCanvas);

		ObjectModel.setCanvasInfo(startCanvas);
		ObjectModel.fixedAutoLayout(VERTICAL);
		ObjectModel.setPipelineFlowPalette(paletteJson);
		const node = ObjectModel.createNode(filterNode);
		ObjectModel.addNode(node);

		const expectedCanvas = addNodeVerticalLayoutCanvas;
		const actualCanvas = ObjectModel.getCanvasInfo();

		// Delete ID because IDs are generated at runtime and therefore won't be
		// the same between expected and actual.
		delete actualCanvas.nodes[3].id;

		// logger.info("Expected Canvas = " + JSON.stringify(expectedCanvas, null, 2));
		// logger.info("Actual Canvas   = " + JSON.stringify(actualCanvas, null, 2));

		expect(_.isEqual(expectedCanvas, actualCanvas)).to.be.true;
	});

	it("should oneTimeLayout a canvas horiziontally", () => {
		logger.info("should oneTimeLayout a canvas horiziontally");

		const startCanvas = initialCanvas;

		deepFreeze(startCanvas);

		ObjectModel.setCanvasInfo(startCanvas);
		ObjectModel.autoLayout(HORIZONTAL);

		const expectedCanvas = horizontalLayoutCanvas;

		const actualCanvas = ObjectModel.getCanvasInfo();

		// logger.info("Expected Canvas = " + JSON.stringify(expectedCanvas, null, 2));
		// logger.info("Actual Canvas   = " + JSON.stringify(actualCanvas, null, 2));

		expect(_.isEqual(expectedCanvas, actualCanvas)).to.be.true;

	});

	it("should oneTimeLayout a canvas vertically", () => {
		logger.info("should oneTimeLayout a canvas vertically");

		const startCanvas = initialCanvas;

		deepFreeze(startCanvas);

		ObjectModel.setCanvasInfo(startCanvas);
		ObjectModel.autoLayout(VERTICAL);

		const expectedCanvas = verticalLayoutCanvas;

		const actualCanvas = ObjectModel.getCanvasInfo();

		// logger.info("Expected Canvas = " + JSON.stringify(expectedCanvas, null, 2));
		// logger.info("Actual Canvas   = " + JSON.stringify(actualCanvas, null, 2));

		expect(_.isEqual(expectedCanvas, actualCanvas)).to.be.true;
	});

	it("should move a node after oneTimeLayout horiziontally", () => {
		logger.info("should move a node after oneTimeLayout horiziontally");

		const startCanvas = initialCanvas;

		deepFreeze(startCanvas);

		ObjectModel.setCanvasInfo(startCanvas);
		ObjectModel.fixedLayout = NONE;
		ObjectModel.autoLayout(HORIZONTAL);

		ObjectModel.moveObjects(moveVarNode);

		const expectedCanvas = moveNodeHorizontalLayoutCanvas;
		const actualCanvas = ObjectModel.getCanvasInfo();

		// logger.info("Expected Canvas = " + JSON.stringify(expectedCanvas, null, 2));
		// logger.info("Actual Canvas   = " + JSON.stringify(actualCanvas, null, 2));

		expect(_.isEqual(expectedCanvas, actualCanvas)).to.be.true;
	});

	it("should move a node after oneTimeLayout vertically", () => {
		logger.info("should move a node after oneTimeLayout vertically");

		const startCanvas = initialCanvas;

		deepFreeze(startCanvas);

		ObjectModel.setCanvasInfo(startCanvas);
		ObjectModel.autoLayout(VERTICAL);

		ObjectModel.moveObjects(moveVarNode);


		const expectedCanvas = moveNodeVerticalLayoutCanvas;
		const actualCanvas = ObjectModel.getCanvasInfo();

		// logger.info("Expected Canvas = " + JSON.stringify(expectedCanvas, null, 2));
		// logger.info("Actual Canvas   = " + JSON.stringify(actualCanvas, null, 2));

		expect(_.isEqual(expectedCanvas, actualCanvas)).to.be.true;
	});

	it("should return parameters of a node", () => {
		logger.info("should return parameters of a node");

		deepFreeze(startPipelineFlow);

		ObjectModel.setPipelineFlow(startPipelineFlow);
		var actualParameters = ObjectModel.getNodeParameters("idGWRVT47XDV");

		const expectedParameters = nodeParameters;


		// logger.info("Expected Canvas = " + JSON.stringify(expectedParameters, null, 4));
		// logger.info("Actual Canvas   = " + JSON.stringify(actualParameters, null, 4));

		expect(_.isEqual(expectedParameters, actualParameters)).to.be.true;
	});


	it("should save parameters of a node", () => {
		logger.info("should save parameters of a node");

		deepFreeze(startPipelineFlow);

		ObjectModel.setPipelineFlow(startPipelineFlow);
		ObjectModel.setNodeParameters("id8I6RH2V91XW", { "paramA": "Value for Param A", "paramB": "Value for Param B" });

		const expectedCanvas = nodeParameterAddedPipelineFlow;
		const actualCanvas = ObjectModel.getPipelineFlow();

		// logger.info("Expected Canvas = " + JSON.stringify(expectedCanvas, null, 4));
		// logger.info("Actual Canvas   = " + JSON.stringify(actualCanvas, null, 4));

		expect(_.isEqual(JSON.stringify(expectedCanvas, null, 4), JSON.stringify(actualCanvas, null, 4))).to.be.true;
	});

	it("should save a messages for a node", () => {
		logger.info("should save a messages for a node");

		deepFreeze(startPipelineFlow);
		const expectedMessage = { "id_ref": "controlOne", "type": "warning", "text": "This is a test message" };
		ObjectModel.setPipelineFlow(startPipelineFlow);
		ObjectModel.setNodeMessage("id8I6RH2V91XW", expectedMessage);

		const actualMessage = ObjectModel.getNodeMessage("id8I6RH2V91XW", "controlOne");

		expect(_.isEqual(expectedMessage, actualMessage)).to.be.true;
	});

	it("should save multiple messages for a node", () => {
		logger.info("should save multiple messages for a node");

		deepFreeze(startPipelineFlow);
		const message1 = { "id_ref": "controlOne", "type": "warning", "text": "This is a test message" };
		const message2 = { "id_ref": "controlTwo", "type": "error", "text": "This is an error test message" };
		const message3 = { "id_ref": "controlThree", "type": "info", "text": "" };
		const expectedMessages = [
			message1,
			message2,
			message3
		];
		ObjectModel.setPipelineFlow(startPipelineFlow);
		ObjectModel.setNodeMessage("id8I6RH2V91XW", message1);
		ObjectModel.setNodeMessage("id8I6RH2V91XW", message2);
		ObjectModel.setNodeMessage("id8I6RH2V91XW", message3);

		const actualMessages = ObjectModel.getNodeMessages("id8I6RH2V91XW");


		// logger.info("Expected Messages = " + JSON.stringify(expectedMessages, null, 4));
		// logger.info("Actual messages   = " + JSON.stringify(actualMessages, null, 4));


		expect(_.isEqual(expectedMessages, actualMessages)).to.be.true;
	});

	it("should save one control messages for a node", () => {
		logger.info("should save one control messages for a node");

		deepFreeze(startPipelineFlow);
		const message1 = { "id_ref": "controlOne", "type": "warning", "text": "This is a test message" };
		const message2 = { "id_ref": "controlOne", "type": "error", "text": "This is an error test message" };
		const message3 = { "id_ref": "controlThree", "type": "info", "text": "" };
		const expectedMessages = [
			message2,
			message3
		];
		ObjectModel.setPipelineFlow(startPipelineFlow);
		ObjectModel.setNodeMessage("id8I6RH2V91XW", message1);
		ObjectModel.setNodeMessage("id8I6RH2V91XW", message2);
		ObjectModel.setNodeMessage("id8I6RH2V91XW", message3);

		const actualMessages = ObjectModel.getNodeMessages("id8I6RH2V91XW");

		// logger.info("Expected Messages = " + JSON.stringify(expectedMessages, null, 4));
		// logger.info("Actual messages   = " + JSON.stringify(actualMessages, null, 4));

		expect(_.isEqual(expectedMessages, actualMessages)).to.be.true;
	});

	it("should clear all messages for a node", () => {
		logger.info("should clear all control messages for a node");

		deepFreeze(startPipelineFlow);
		const message1 = { "id_ref": "controlOne", "type": "warning", "text": "This is a test message" };
		const message2 = { "id_ref": "controlTwo", "type": "error", "text": "This is an error test message" };
		const message3 = { "id_ref": "controlThree", "type": "info", "text": "" };
		const expectedMessages = [
			message1,
			message2,
			message3
		];
		ObjectModel.setPipelineFlow(startPipelineFlow);
		ObjectModel.setNodeMessage("id8I6RH2V91XW", message1);
		ObjectModel.setNodeMessage("id8I6RH2V91XW", message2);
		ObjectModel.setNodeMessage("id8I6RH2V91XW", message3);

		const actualMessages = ObjectModel.getNodeMessages("id8I6RH2V91XW");

		// logger.info("Expected Messages = " + JSON.stringify(expectedMessages, null, 4));
		// logger.info("Actual messages   = " + JSON.stringify(actualMessages, null, 4));

		expect(_.isEqual(expectedMessages, actualMessages)).to.be.true;

		const expectedClearedMessages = [];

		ObjectModel.setNodeMessages("id8I6RH2V91XW", expectedClearedMessages);
		const actualClearedMessages = ObjectModel.getNodeMessages("id8I6RH2V91XW");

		// logger.info("Expected Messages = " + JSON.stringify(expectedClearedMessages, null, 4));
		// logger.info("Actual messages   = " + JSON.stringify(actualClearedMessages, null, 4));

		expect(_.isEqual(expectedClearedMessages, actualClearedMessages)).to.be.true;

	});

	it("should add palette item into existing test category", () => {
		logger.info("should add palette item into existing test category");
		ObjectModel.setPipelineFlowPalette(paletteJson);
		const nodeTypeObj = {
			"label": "MyNodeType",
			"description": "My custom node type",
			"operator_id_ref": "filter",
			"type": "binding",
			"image": "/images/filter.svg"
		};

		const expectedPaletteJSON = JSON.parse(JSON.stringify(paletteJson));
		expectedPaletteJSON.categories[0].nodetypes.push(nodeTypeObj);

		ObjectModel.addNodeTypeToPalette(nodeTypeObj, "test");

		expect(_.isEqual(expectedPaletteJSON, ObjectModel.getPaletteData())).to.be.true;
	});

	it("should add palette item into new category without label", () => {
		logger.info("should add palette item into new category without label");

		const newCategoryName = "newCategory";
		ObjectModel.setPipelineFlowPalette(paletteJson);
		const nodeTypeObj = {
			"label": "MyNodeType",
			"description": "My custom node type",
			"operator_id_ref": "filter",
			"type": "binding",
			"image": "/images/filter.svg"
		};

		const expectedPaletteJSON = JSON.parse(JSON.stringify(paletteJson));
		const newCategory = {};
		newCategory.category = newCategoryName;
		newCategory.label = newCategoryName;
		newCategory.nodetypes = [nodeTypeObj];
		expectedPaletteJSON.categories.push(newCategory);

		ObjectModel.addNodeTypeToPalette(nodeTypeObj, newCategoryName);

		expect(_.isEqual(expectedPaletteJSON, ObjectModel.getPaletteData())).to.be.true;
	});

	it("should add palette item into new category with label", () => {
		logger.info("should add palette item into new category with label");
		const newCategoryName = "newCategory";
		const newCategoryLabel = "New Category";
		ObjectModel.setPipelineFlowPalette(paletteJson);
		const nodeTypeObj = {
			"label": "MyNodeType",
			"description": "My custom node type",
			"operator_id_ref": "filter",
			"type": "binding",
			"image": "/images/filter.svg"
		};

		const expectedPaletteJSON = JSON.parse(JSON.stringify(paletteJson));
		const newCategory = {};
		newCategory.category = newCategoryName;
		newCategory.label = newCategoryLabel;
		newCategory.nodetypes = [nodeTypeObj];
		expectedPaletteJSON.categories.push(newCategory);

		ObjectModel.addNodeTypeToPalette(nodeTypeObj, newCategoryName, newCategoryLabel);

		expect(_.isEqual(expectedPaletteJSON, ObjectModel.getPaletteData())).to.be.true;
	});

});
