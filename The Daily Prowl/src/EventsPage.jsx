import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabaseClient';

const EVENTS_PER_PAGE = 10;

function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('event')
        .select('*')
        .gt('start_datetime', now)
        .order('start_datetime', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const styles = {
    container: {
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 0,
      justifyContent: 'flex-start'
    },
    header: {
      flexShrink: 0,
      background: 'linear-gradient(to bottom, rgba(200, 180, 100, 0.95), rgba(200, 180, 100, 0.8))',
      zIndex: 10,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxSizing: 'border-box'
    },
    backButton: {
      background: '#e0c25a',
      border: '2px solid #1f1a0e',
      borderRadius: '10px',
      padding: '8px 14px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      cursor: 'pointer',
      boxShadow: '0 3px 0 rgba(0,0,0,.35)'
    },
    title: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#171513',
      textShadow: '0 2px 0 rgba(255,255,255,0.5)'
    },
    scrollContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 16px 20px 16px'
    },
    cardList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    card: {
      background: '#ebeef4',
      border: '2px solid #2d2a22',
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: '0 3px 0 rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.55)',
      cursor: 'pointer',
      transition: 'transform 0.2s'
    },
    cardImage: {
      width: '100%',
      height: '140px',
      objectFit: 'cover',
      borderBottom: '2px solid #2d2a22'
    },
    cardContent: {
      padding: '12px 14px'
    },
    cardTitle: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#171513',
      marginBottom: '8px'
    },
    cardInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      color: '#444',
      marginBottom: '6px'
    },
    badge: {
      display: 'inline-block',
      background: '#f8bd00',
      color: '#171513',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '0.85rem',
      fontWeight: 'bold',
      padding: '4px 10px',
      borderRadius: '12px',
      border: '1px solid #1f1a0e',
      marginTop: '8px'
    },
    message: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.2rem',
      textAlign: 'center',
      padding: '40px 20px',
      color: '#171513'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
      marginTop: '20px',
      paddingBottom: '10px'
    },
    pageButton: {
      background: '#e0c25a',
      border: '2px solid #1f1a0e',
      borderRadius: '10px',
      padding: '10px 18px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 3px 0 rgba(0,0,0,.35)'
    },
    pageButtonDisabled: {
      background: '#a0a0a0',
      border: '2px solid #666',
      borderRadius: '10px',
      padding: '10px 18px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'not-allowed',
      boxShadow: '0 3px 0 rgba(0,0,0,.2)',
      opacity: 0.6
    },
    pageInfo: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#171513'
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const currentEvents = events.slice(startIndex, endIndex);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  return (
    <div className="app-background" style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/third')}>
          ← Back
        </button>
        <span style={styles.title}>Upcoming Events</span>
      </div>

      <div ref={scrollContainerRef} style={styles.scrollContainer}>
        {loading && <p style={styles.message}>Loading events...</p>}
        {error && <p style={styles.message}>Error: {error}</p>}
        {!loading && !error && events.length === 0 && (
          <p style={styles.message}>No upcoming events found.</p>
        )}

        <div style={styles.cardList}>
          {currentEvents.map((event) => (
            <div
              key={event.event_id}
              style={styles.card}
              onClick={() => navigate(`/events/${event.event_id}`)}
            >
              {event.image_url && (
                <img src={event.image_url} alt={event.title} style={styles.cardImage} />
              )}
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>{event.title}</div>
                <div style={styles.cardInfo}>
                  📅 {formatDateTime(event.start_datetime)}
                </div>
                {event.location && (
                  <div style={styles.cardInfo}>📍 {event.location}</div>
                )}
                {event.event_type && (
                  <span style={styles.badge}>{event.event_type}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {!loading && !error && events.length > 0 && (
          <div style={styles.pagination}>
            <button
              style={currentPage === 1 ? styles.pageButtonDisabled : styles.pageButton}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <span style={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              style={currentPage === totalPages ? styles.pageButtonDisabled : styles.pageButton}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;

