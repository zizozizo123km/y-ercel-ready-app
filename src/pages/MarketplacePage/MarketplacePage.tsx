import { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MarketplaceSidebar from '../../components/MarketplaceComponents/MarketplaceSidebar/MarketplaceSidebar';
import MarketplaceFeed from '../../components/MarketplaceComponents/MarketplaceFeed/MarketplaceFeed';
import './MarketplacePage.css';

const MarketplacePage: FC = () => {
  return (
    <div className="marketplace-page">
      <Container fluid className="p-0">
        <Row className="flex-xl-nowrap g-0">
          
          {/* Sidebar for Marketplace */}
          <Col xs={12} xl={3} className="marketplace-sidebar-col">
            <MarketplaceSidebar />
          </Col>

          {/* Main Content Feed */}
          <Col xs={12} xl={9} className="marketplace-feed-col">
            <main className="marketplace-main-content py-4 px-3 px-lg-4">
              <MarketplaceFeed />
            </main>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default MarketplacePage;