import React from 'react';
import { Col, Row } from 'reactstrap';

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>Blog Project</h1>
          <p>작업 내용을 기록하는 블로그입니다.</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
