Feature: MainLegacy

  ** Make sure the test harness is running and listening to http://localhost:3001 ***

  As a human
  I want to create a canvas
  So I can build a graph

  Scenario: Sanity test empty canvas with the Legacy rendering engine
		Then I resize the window size to 1400 width and 800 height
		Given I am on the test harness
    Given I have toggled the app side panel
		Given I have selected the "Modal" palette layout
		Given I have uploaded predefined palette "modelerPalette.json"
		Given I have selected the "Legacy" rendering engine
		Given I have toggled the app side panel
		Then I pause for 1 seconds

		Then I resize the window size to 1000 width and 800 height

		Then I open the palette
    Then I add node 1 a "Var. File" node from the "Import" category onto the canvas at 200, 400
    Then I add node 2 a "Derive" node from the "Field Ops" category onto the canvas at 300, 400
		Then I close the palette
    Then I link node 1 the "Var. File" node to node 2 the "Derive" node for link 1 on the canvas
    Then I select node 2 the "Derive" node
    Then I add comment 1 at location 200, 450 with the text "This comment box should be linked to the derive node."
		Then I open the palette
    Then I add node 3 a "Filter" node from the "Field Ops" category onto the canvas at 400, 400
    Then I link node 2 the "Derive" node to node 3 the "Filter" node for link 3 on the canvas
    Then I add node 4 a "Type" node from the "Field Ops" category onto the canvas at 500, 400
    Then I link node 3 the "Filter" node to node 4 the "Type" node for link 4 on the canvas
    Then I add node 5 a "C5.0" node from the "Modeling" category onto the canvas at 600, 500
    Then I add node 6 a "Neural Net" node from the "Modeling" category onto the canvas at 700, 500
		Then I close the palette
    Then I link node 4 the "Type" node to node 5 the "C5.0" node for link 5 on the canvas
    # this next test case fails because of issue #109
    #Then I link node 4 the "Type" node to node 6 the "Neural Net" node for link 6 on the canvas
    Then I select node 4 the "Type" node
    Then I add comment 2 at location 450, 550 with the text "this comment box should be linked to the type node"
		Then I pause for 1 seconds
    Then I link comment 2 with text "this comment box should be linked to the type node" to node 6 the "Neural Net" node for link 7 on the canvas
		Then I pause for 1 seconds
    Then I add comment 3 at location 650, 350 with the text "This is the functional test canvas that we build through automated test cases.  This comment is meant to simulate a typical comment for annotating the entire canvas."

    # Now delete everything and go back to empty canvas
		Then I pause for 1 seconds

    Then I delete node 1 the "Var. File" node
    #Then I delete comment link at 270, 400 between comment 1 and node 1 the "Derive" node
    Then I delete node 1 the "Derive" node
    Then I delete comment 1 linked to the "Derive" node with the comment text "This comment box should be linked to the derive node."
    #Then I delete node link at 435, 288 between node 1 the "Filter" node and node 2 the "Type" node
    Then I delete node 1 the "Filter" node
    Then I delete comment 1 linked to the "Type" node with the comment text "this comment box should be linked to the type node"
    Then I delete node 1 the "Type" node
    Then I delete node 1 the "C5.0" node
    Then I delete node 1 the "Neural Net" node
    Then I delete comment 1 linked to the "Canvas" node with the comment text "This is the functional test canvas that we build through automated test cases.  This comment is meant to simulate a typical comment for annotating the entire canvas."

    # Verify that the diagram.json has no content.
    Then I expect the object model to be empty
		Then I write out the event log
		Then I pause for 2 seconds