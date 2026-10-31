import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

export default function FilterSortBar({ sortBy, onSortChange }) {
  return (
    <Row className="mb-3">
      <Col>
        <div className="d-flex align-items-center gap-2">
          <label className="small fw-semibold" style={{ color: 'var(--text-muted)' }}>Sort by:</label>
          <ButtonGroup size="sm" role="group" aria-label="Sort threads by">
            <Button
              variant={sortBy === 'newest' ? 'primary' : 'outline-secondary'}
              onClick={() => onSortChange('newest')}
              className={sortBy === 'newest' ? 'sort-btn-active' : 'sort-btn'}
              aria-pressed={sortBy === 'newest'}
              aria-label="Sort by newest threads"
            >
              <i className="bi bi-arrow-down" aria-hidden="true"></i> Newest
            </Button>
            <Button
              variant={sortBy === 'most-upvoted' ? 'primary' : 'outline-secondary'}
              onClick={() => onSortChange('most-upvoted')}
              className={sortBy === 'most-upvoted' ? 'sort-btn-active' : 'sort-btn'}
              aria-pressed={sortBy === 'most-upvoted'}
              aria-label="Sort by most upvoted threads"
            >
              <i className="bi bi-fire" aria-hidden="true"></i> Most Upvoted
            </Button>
          </ButtonGroup>
        </div>
      </Col>
    </Row>
  );
}
