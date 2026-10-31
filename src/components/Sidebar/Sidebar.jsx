import { useNavigate, useLocation } from "react-router-dom";
import { Nav, ListGroup } from "react-bootstrap";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleKeyDown = (e, path) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigation(path);
    }
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${!isOpen ? 'mobile-hidden' : ''}`} aria-label="Sidebar navigation">
        <Nav className="flex-column">
          <div className="mb-4">
            <h6 className="text-uppercase fw-bold small mb-2 px-3" style={{ color: 'var(--text-muted)' }}>Menu</h6>
            <ListGroup variant="flush">
              <ListGroup.Item 
                action
                active={isActive("/home")}
                onClick={() => handleNavigation("/home")}
                onKeyDown={(e) => handleKeyDown(e, "/home")}
                className="border-0 rounded mx-2"
                role="button"
                tabIndex="0"
                aria-current={isActive("/home") ? "page" : undefined}
              >
                <i className="bi bi-house-fill" aria-hidden="true"></i> Home
              </ListGroup.Item>
              <ListGroup.Item 
                action
                active={isActive("/profile")}
                onClick={() => handleNavigation("/profile")}
                onKeyDown={(e) => handleKeyDown(e, "/profile")}
                className="border-0 rounded mx-2"
                role="button"
                tabIndex="0"
                aria-current={isActive("/profile") ? "page" : undefined}
              >
                <i className="bi bi-person-fill" aria-hidden="true"></i> Profile
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Nav>
      </aside>
    </>
  );
}

export default Sidebar;
