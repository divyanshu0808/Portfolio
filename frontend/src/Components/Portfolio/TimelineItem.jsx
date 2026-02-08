import '../../CSS/Portfolio/TimelineItem.css';

const TimelineItem = ({ title, subtitle, period, description, isLast = false, isVisible = false, delay = 0 }) => {
  return (
    <div
      className={`timeline-item ${isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="timeline-line"></div>
      )}

      {/* Timeline Dot */}
      <div className="timeline-dot">
        <div className="timeline-dot-inner"></div>
      </div>

      {/* Content */}
      <div className="timeline-content">
        <div className="timeline-card">
          <div className="timeline-header">
            <h3 className="timeline-title">{title}</h3>
            <span className="timeline-period">
              {period}
            </span>
          </div>
          <p className="timeline-subtitle">{subtitle}</p>
          {description && (
            <p className="timeline-description">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;