// JSX allows html to be included in js/ts file. No need to tab between files.
import "./App.css";
import mapImg from './img/map_image.png';
import laCountyImg from './img/la_county_img.png';
import * as React from "react";   // React used in Event_History
import { useState } from "react";
// import { Card, Form, Pagination, Table } from "react-bootstrap";
// import { Table } from "react-bootstrap";         // Summary_layer2
// import { Card, Table } from "react-bootstrap";  // Card needed for BAC_layer3
import { Card, Pagination, Table } from "react-bootstrap";  // Pagination is needed for Event_History
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";              // Summary_layer2
import Container from "react-bootstrap/Container";  // Summary_layer2
import Image from "react-bootstrap/Image";          // Summary_layer2
import Row from "react-bootstrap/Row";              // Summary_layer2

export default function App() {  // `export default` makes App() the default export for this package.
                                 //   This means that App() can be imported using any alias.
  return (
    <div>
      <Nav /> {/*Call the nav function here*/}
      <div className="_accordian_padding"></div>
      <Summary />
      <div className="_accordian_padding"></div>
      <Building_Land_Characteristics />
      <div className="_accordian_padding"></div>
      <Event_History />
      <div className="_accordian_padding"></div>
      <Assessment_History />
    </div>
  );
}

// In TypeScript (and JavaScript) non-default exports must be part of the func declaration.
export function Nav() {
  return (
    <div id="navigation" className="row text-bg-primary p-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={laCountyImg}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            Los Angeles County Assessor Portal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="_map_search"
                  aria-current="page"
                  href="#"
                >
                  Map Search
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="_pais" href="#">
                  PAIS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="_assessor_i" href="#">
                  Assessor Internet
                </a>
              </li>
              <li className="nav-item">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export function Summary() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Summary</Accordion.Header>
        <Accordion.Body>
          <Summary_layer1 />
          <Summary_layer2 />
          <Summary_layer3 />
          <Summary_layer4 />
          <Summary_layer5 />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

//Layer 1 of summary section (General Info)
function Summary_layer1() {
  return (
    <>
      <div className="row">
        <h2> AIN: 8480-003-062 </h2>
        <hr />
      </div>
      <div className="row">
        <div className="col-4">
          <strong>Street Address:</strong>
          <p>3291 E SPRINGCREEK DR</p>
          <p> WEST COVINA CA 91791-2378</p>
        </div>
        <div className="col-4">
          <strong>Use Type:</strong>
          <p>Single Family Residence</p>
          <strong>Parcel Type:</strong>
          <p> Regular Fee Parcel</p>
          <strong>Tax Rate Type:</strong>
          <p> 10592</p>
        </div>
        <div className="col-4">
          <strong>Street Address:</strong>
          <span className="_green_confirm"> ACTIVE</span>
          <br></br>
          <strong>Create Date:</strong>
          <span className=""> 10/28/2003</span>
          <br></br>
          <strong>Delete Date:</strong>
          <span className=""> </span>
          <br></br>
          <strong>Tax Status:</strong>
          <span className="_green_confirm"> CURRENT</span>
          <br></br>
          <strong>Year Defaulted:</strong>
          <span className=""> </span>
          <br></br>
          <strong>Exemption:</strong>
          <span className=""> None</span>
        </div>
      </div>
    </>
  );
}

//layer 2 of summary section (Table 1 and Clickable map)
function Summary_layer2() {
  return (
    <div className="row">
      <div className="table-responsive col-9">
        <Table bordered>
          <thead>
            <tr>
              <th colSpan={6}>Building (0101) & Land Overview</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Use Code:</strong>
              </td>
              <td>010D</td>
              <td>
                <strong># of Units</strong>
              </td>
              <td>010D</td>
              <td>
                <strong>Year Built:</strong>
              </td>
              <td>010D</td>
            </tr>
            <tr>
              <td>
                <strong>Design Type:</strong>
              </td>
              <td>1234</td>
              <td>
                <strong>Beds/Baths:</strong>
              </td>
              <td>1234</td>
              <td>
                <strong>Effective Year:</strong>
              </td>
              <td>1234</td>
            </tr>
            <tr>
              <td>
                <strong>Quality Class:</strong>
              </td>
              <td>1234</td>
              <td>
                <strong>Building SqFt:</strong>
              </td>
              <td>1234</td>
              <td>
                <strong>Land SqFt</strong>
              </td>
              <td>1234</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="col-3">
        <Container>
          <Row>
            <Col xs={6} md={4} lg={10}>
              <a href="your-link-url">
                <Image src={mapImg} thumbnail />
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

//layer 3 of summary section (Table 2)
function Summary_layer3() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th colSpan={3}>2024 Roll Preparation</th>
          <th colSpan={2}>2023 Current Roll</th>
          <th>RC</th>
          <th>YEAR</th>
          <th colSpan={2}>2020 Base Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Land:</strong>
          </td>
          <td>$</td>
          <td>398,750</td>
          <td>$</td>
          <td>398,750</td>
          <td>T</td>
          <td>2000</td>
          <td>$</td>
          <td>371,900</td>
        </tr>
        <tr>
          <td>
            <strong>Improvements</strong>
          </td>
          <td>$</td>
          <td>398,750</td>
          <td>$</td>
          <td>398,750</td>
          <td>T</td>
          <td>2000</td>
          <td>$</td>
          <td>371,900</td>
        </tr>
        <tr>
          <td>
            <strong>Total</strong>
          </td>
          <td>$</td>
          <td>398,750</td>
          <td>$</td>
          <td>398,750</td>
          <td></td>
          <td></td>
          <td>$</td>
          <td>371,900</td>
        </tr>
      </tbody>
    </Table>
  );
}

//layer 4 of summary section (Table 3 as Extra Information)
function Summary_layer4() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th colSpan={6}>Assessor's Responsible Division</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>District:</strong>
          </td>
          <td>East District Office</td>
          <td>
            <a href="">East District Officea</a>
          </td>
          <td>Phone: (626) 258-6001</td>
        </tr>
        <tr>
          <td>
            <strong>Region:</strong>
          </td>
          <td>06</td>
          <td>1190 Durfee Ave.</td>
          <td>Toll Free: 1 (888) 807-2111</td>
        </tr>
        <tr>
          <td>
            <strong>District:</strong>
          </td>
          <td>06146 W. COVINA HILLS</td>
          <td>South El Monte, CA 91733</td>
          <td>M-F 7:30 am to 5:00 pm</td>
        </tr>
      </tbody>
    </Table>
  );
}

//layer 5 of summary section (Mapping API)
function Summary_layer5() {
  return (
    <h2 className="text-center">=====THIS IS WHERE THE MAP API WILL GO=====</h2>
  );
}

function Building_Land_Characteristics() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Building and Land Characteristics</Accordion.Header>
        <Accordion.Body>
          <BAC_layer1 />
          <BAC_layer2 />
          <br></br>
          <BAC_layer3 />
          <BAC_layer4 />
          <BAC_layer5 />
          <BAC_layer6 />
          <BAC_layer7 />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function BAC_layer1() {
  return (
    <>
      <div className="row">
        <h5> Land Information </h5>
        <hr />
      </div>
      <Table>
        <thead>
          <tr>
            <th colSpan={3}>Use Code = 010D (Single Family Residence)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Total SqFt (GIS):</strong>
            </td>
            <td>0</td>
            <td>
              <strong>Servers:</strong>
            </td>
            <td>No</td>
            <td>
              <strong>Corner Lot:</strong>
            </td>
            <td>No</td>
            <td>
              <strong>Zoning:</strong>
            </td>
            <td>(Refer Issuing Agency)</td>
          </tr>
          <tr>
            <td>
              <strong>Total SqFt (PDB):</strong>
            </td>
            <td>0</td>
            <td>
              <strong>Flight Path:</strong>
            </td>
            <td>No</td>
            <td>
              <strong>Golf Front:</strong>
            </td>
            <td>No</td>
            <td>
              <strong></strong>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>Usable SqFt:</strong>
            </td>
            <td>0</td>
            <td>
              <strong>X-Traffic:</strong>
            </td>
            <td>No</td>
            <td>
              <strong>Horse Lot:</strong>
            </td>
            <td>Yes</td>
            <td>
              <strong>Code Split:</strong>
            </td>
            <td>No</td>
          </tr>
          <tr>
            <td>
              <strong>Acres:</strong>
            </td>
            <td></td>
            <td>
              <strong>Freeway:</strong>
            </td>
            <td>Yes</td>
            <td>
              <strong>View:</strong>
            </td>
            <td>None</td>
            <td>
              <strong>Impairment</strong>
            </td>
            <td>None</td>
          </tr>
          <tr>
            <td>
              <strong>Land W' x D': </strong>
            </td>
            <td>66 x 70</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

function BAC_layer2() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <strong>Street Address:</strong>
          <p>3291 E SPRINGCREEK DR WEST COVINA CA 91791-2378</p>
        </div>
      </div>
      <br></br>
      <div className="row">
        <div className="col-12">
          <strong>Legal Description</strong> (for assessment purposes):
          <p>TR=53821 LOT 29</p>
        </div>
      </div>
    </>
  );
}

function BAC_layer3() {
  return (
    <Card>
      <Card.Body>
        <Card.Text>
          <strong>Use Code: 010D: </strong>(Single Family Residence)
          <br />
          0 = Residential
          <br />
          1 = Single Family Residence
          <br />
          0 = Open
          <br />D = Planned Unit Development (PUD)
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function BAC_layer4() {
  return (
    <>
      <br></br>
      <div className="row">
        <h5> Building Information </h5>
        <hr />
      </div>
      <Table bordered>
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <strong>SUBPART:</strong>
            </td>
            <td>0101</td>
            <td>
              <strong># of Units:</strong>
            </td>
            <td>1</td>
            <td>
              <strong>Year Built:</strong>
            </td>
            <td>2003</td>
            <td>
              <strong>RCN Other:</strong>
            </td>
            <td>$ 15,300</td>
          </tr>
          <tr>
            <td>
              <strong>Design Type:</strong>
            </td>
            <td>1030</td>
            <td>
              <strong>Beds/Baths:</strong>
            </td>
            <td>4/3</td>
            <td>
              <strong>Effective Year:</strong>
            </td>
            <td>2003</td>
            <td>
              <strong>RCN Other Trended:</strong>
            </td>
            <td>$ 25,734</td>
          </tr>
          <tr>
            <td>
              <strong>Quality Class:</strong>
            </td>
            <td>D75B</td>
            <td>
              <strong>Building SqFt:</strong>
            </td>
            <td>2406</td>
            <td>
              <strong>Depreciation:</strong>
            </td>
            <td>UN70 / / 0</td>
            <td>
              <strong>Year Change:</strong>
            </td>
            <td>2004</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

function BAC_layer5() {
  return (
    <>
      <br></br>
      <Card>
        <Card.Body>
          <Card.Text>
            <strong>Design Type: 0130</strong>
            <br />
            0 = Residential
            <br />
            1 = Single Family Residence
            <br />
            3 = Central Refrigeration and Heat
            <br />0 = Unused or Unknown Code (No Meaning)
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

function BAC_layer6() {
  return (
    <>
      <br></br>
      <Table bordered>
        <thead></thead>
        <tbody>
          <tr>
            <td colSpan={1}>
              <strong>SUMMARY:</strong>
            </td>
            <td colSpan={1}>
              <strong>Total</strong>
            </td>
            <td colSpan={1}>
              <strong># of Units:</strong>
            </td>
            <td colSpan={1}>1</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <strong>Beds/Baths:</strong>
            </td>
            <td>4/3</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <strong>Building SqFt:</strong>
            </td>
            <td>2406</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <strong>Avg SqFt/Unit:</strong>
            </td>
            <td>2,406</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

function BAC_layer7() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {" "}
          Quality Class: Defines the Construction Type, Quality Range, and Shape
          Class. For Example: D7.5C (Construction Type = 'D', Quality Range =
          '7.5', Shape Class='C')
        </Accordion.Header>
        <Accordion.Body>
          <p>
            The Quality Class is used to estimate construction costs and as a
            unit of comparison in relation to surrounding properties.
          </p>
          <p>
            Construction Type (A, B, C, D, or S):
            <ul>
              <li>Class A: Fireproof construction - structural steel frame.</li>
              <li>
                Class B: Fireproof construction - reinforced concrete frame.
              </li>
              <li>
                Class C: Fire-resistant construction - masonry walls,
                combustible roof and interior.
              </li>
              <li>
                Class D: Non-fireproof construction - usually wood frame (Note:
                Class D Single Family Residence Construction predominates in Los
                Angeles County).
              </li>
              <li>
                Class S: Specialized buildings that do not fit in any of the
                above categories (typically regarding Commercial/Industrial
                properties).
              </li>
            </ul>
          </p>
          <p>
            Quality Range (1.0 to 14.5 or 'X' ):
            <ul>
              <li>
                The quality class concept is a function of all construction
                features, depending upon quality of materials, construction
                methods, and workmanship. It considers specifications for
                foundation, structure, roof, floor, interior, exterior, heating
                & cooling, plumbing, kitchen, and bathrooms. 1.0 = lowest
                quality.
              </li>
              <li>
                Note: Quality of 5.5 meets the current minimum standards for new
                construction in most municipalities. Quality of 9.0 or greater
                is referencing high end or specialty construction and/or
                materials.
              </li>
              <li>
                'X' Quality: Unique or unusual construction that does not lend
                itself to being classified using the standard classification
                system.
              </li>
            </ul>
          </p>
          <p>
            Shape Class (A, B, C, D):
            <ul>
              <li>
                The shape class is based on the building's perimeter in relation
                to the total square footage.
              </li>
              <li>
                A structure with a relatively large perimeter in relation to its
                square footage (many angles, turns, a 'cut-up' custom shape,
                etc.) typically costs more to construct than a simple
                square/rectangle structure.
              </li>
              <li>
                Shape A represents a relatively square/rectangle structure. It
                has a relatively small perimeter compared to its total square
                footage.
              </li>
              <li>
                Shape D represents a structure with many angles, turns, etc. (a
                'cut-up' custom shape). It has a relatively large perimeter
                compared to its total square footage.
              </li>
              <li>
                A structure with a 'DX' Construction Type and Quality Range will
                usually not have a Shape Class.
              </li>
            </ul>
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function Event_History() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Event History</Accordion.Header>
        <Accordion.Body>
          <ExpandableTable />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function ExpandableTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const totalRows: number = 6; // Total number of rows
  const rowsPerPage: number = 3; // Number of rows per page
  const totalPages: number = Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (rowIndex: number) => {
    // Toggle the expanded state of the clicked row
    if (expandedRows.includes(rowIndex)) {
      setExpandedRows(expandedRows.filter((row) => row !== rowIndex));
    } else {
      setExpandedRows([...expandedRows, rowIndex]);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
            <th>Column 6</th>
            <th>Column 7</th>
            <th>Column 8</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3]
            .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((rowIndex) => (
              <React.Fragment key={rowIndex}>
                <tr onClick={() => handleRowClick(rowIndex)}>
                  <td>{rowIndex}</td>
                  <td>Data {rowIndex * 8 - 7}</td>
                  <td>Data {rowIndex * 8 - 6}</td>
                  <td>Data {rowIndex * 8 - 5}</td>
                  <td>Data {rowIndex * 8 - 4}</td>
                  <td>Data {rowIndex * 8 - 3}</td>
                  <td>Data {rowIndex * 8 - 2}</td>
                  <td>Data {rowIndex * 8 - 1}</td>
                  <td>Data {rowIndex * 8}</td>
                </tr>
                {expandedRows.includes(rowIndex) && (
                  <tr>
                    <td colSpan={9}>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Additional Column 1</th>
                            <th>Additional Column 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((subRowIndex) => (
                            <tr key={subRowIndex}>
                              <td>Additional Data {subRowIndex * 2 - 1}</td>
                              <td>Additional Data {subRowIndex * 2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Item
          active={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
        <Pagination.Item
          active={currentPage === 2}
          onClick={() => handlePageChange(2)}
        >
          2
        </Pagination.Item>
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
}

function Assessment_History() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Assessment History</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
