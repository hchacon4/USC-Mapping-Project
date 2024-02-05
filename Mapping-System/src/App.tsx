import "./App.css";
import React from "react";
import { Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

export default function App() {
  return (
    <div>
      <Nav /> {/* Call the nav function here */}
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

function Nav() {
  return (
    <div id="navigation" className="row text-bg-primary p-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="src/img/la_county_img.png"
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

function Summary() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Summary</Accordion.Header>
        <Accordion.Body>
          <Summary_layer1 />
          <Summary_layer2 />
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
                <Image src="src/img/map_image.png" thumbnail />
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

//layer 3 of summary section (Table 2)
function Summary_layer3() {}

//layer 4 of summary section (Table 3 as Extra Information)
function Summary_layer4() {}

//layer 5 of summary section (Mapping API)
function Summary_layer5() {}

function Building_Land_Characteristics() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Building and Land Characteristics</Accordion.Header>
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

function Event_History() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Event History</Accordion.Header>
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
