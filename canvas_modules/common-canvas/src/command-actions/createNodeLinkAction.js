/*
 * Copyright 2017-2020 IBM Corporation
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
import Action from "../command-stack/action.js";

export default class CreateNodeLinkAction extends Action {
	constructor(data, objectModel) {
		super(data);
		this.data = data;
		this.objectModel = objectModel;
		this.apiPipeline = this.objectModel.getAPIPipeline(data.pipelineId);
		this.linkNodeList = this.apiPipeline.createNodeLinks(data);
	}

	getData() {
		this.data.linkIds = this.linkNodeList.map((link) => link.id);
		this.data.linkType = "data"; // Added for historical purposes - for WML Canvas support
		return this.data;
	}

	do() {
		this.apiPipeline.addLinks(this.linkNodeList);
	}

	undo() {
		this.linkNodeList.forEach((link) => {
			this.apiPipeline.deleteLink(link);
		});
	}

	redo() {
		this.do();
	}

}
