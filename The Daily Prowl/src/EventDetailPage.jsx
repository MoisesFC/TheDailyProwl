import './App.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { getCurrentUser } from './utils/mockAuth';

function EventDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'warning'
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    init();
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('event')
        .select('*')
        .eq('event_id', id)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleScheduleEvent = async () => {
    if (!currentUser) {
      alert('Please log in to schedule events');
      return;
    }

    setActionLoading(true);
    setMessage(null);
    setMessageType(null);

    try {
      // First check if student exists in student table
      const { data: existingStudent } = await supabase
        .from('student')
        .select('student_id')
        .eq('student_id', currentUser.id)
        .single();

      // If student doesn't exist, create the record
      if (!existingStudent) {
        console.log('Student record not found, creating one...');
        const { error: studentError } = await supabase
          .from('student')
          .insert({
            student_id: currentUser.id,
            ksu_email: currentUser.email,
            first_name: 'Unknown',
            last_name: 'User',
            major: 'Undeclared'
          });

        if (studentError) {
          console.error('Error creating student record:', studentError);
          throw new Error('Could not create student profile. Please try logging out and signing up again.');
        }
      }

      // Check if already scheduled
      const { data: existingSchedule } = await supabase
        .from('scheduled_event')
        .select('*')
        .eq('student_id', currentUser.id)
        .eq('event_id', id)
        .single();

      if (existingSchedule) {
        setMessage("You've already scheduled this event");
        setMessageType('warning');
        setActionLoading(false);
        return;
      }

      // Not scheduled, insert new record
      const { error } = await supabase
        .from('scheduled_event')
        .insert({
          student_id: currentUser.id,
          event_id: id,
          reminder_sent: false
        });

      if (error) throw error;
      setIsScheduled(true);
      setMessage('Event added to your schedule!');
      setMessageType('success');
    } catch (err) {
      alert('Error scheduling event: ' + err.message);
    } finally {
      setActionLoading(false);
    }
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
      boxSizing: 'border-box',
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    },
    backButton: {
      background: '#e0c25a',
      border: '2px solid #1f1a0e',
      borderRadius: '10px',
      padding: '8px 14px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      cursor: 'pointer',
      boxShadow: '0 3px 0 rgba(0,0,0,.35)',
      flexShrink: 0
    },
    headerTitle: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#171513',
      textShadow: '0 2px 0 rgba(255,255,255,0.5)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flex: 1,
      minWidth: 0
    },
    scrollContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 0 20px 0'
    },
    eventImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover'
    },
    content: {
      padding: '16px'
    },
    title: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#171513',
      marginBottom: '12px'
    },
    badge: {
      display: 'inline-block',
      background: '#f8bd00',
      color: '#171513',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '0.9rem',
      fontWeight: 'bold',
      padding: '5px 12px',
      borderRadius: '12px',
      border: '1px solid #1f1a0e',
      marginBottom: '16px'
    },
    infoRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.1rem',
      color: '#333',
      marginBottom: '10px'
    },
    infoIcon: {
      fontSize: '1.2rem',
      minWidth: '24px'
    },
    description: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      color: '#444',
      lineHeight: '1.5',
      marginTop: '16px',
      padding: '12px',
      background: '#ebeef4',
      borderRadius: '10px',
      border: '1px solid #ccc'
    },
    scheduleButton: {
      width: '100%',
      background: '#f8bd00',
      border: '2px solid #1f1a0e',
      borderRadius: '12px',
      padding: '14px 20px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#171513',
      cursor: 'pointer',
      boxShadow: '0 4px 0 rgba(0,0,0,.35)',
      marginTop: '20px'
    },
    disabledButton: {
      width: '100%',
      background: '#ccc',
      border: '2px solid #999',
      borderRadius: '12px',
      padding: '14px 20px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#666',
      cursor: 'not-allowed',
      boxShadow: '0 4px 0 rgba(0,0,0,.2)',
      marginTop: '20px'
    },
    successMessage: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.1rem',
      textAlign: 'center',
      padding: '10px',
      marginTop: '12px',
      background: '#d4edda',
      color: '#155724',
      borderRadius: '8px',
      border: '1px solid #c3e6cb'
    },
    warningMessage: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.1rem',
      textAlign: 'center',
      padding: '10px',
      marginTop: '12px',
      background: '#fff3cd',
      color: '#856404',
      borderRadius: '8px',
      border: '1px solid #ffeeba'
    },
    message: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.2rem',
      textAlign: 'center',
      padding: '40px 20px',
      color: '#171513'
    }
  };

  if (loading) {
    return (
      <div className="app-background" style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate('/events')}>
            ← Back
          </button>
          <span style={styles.headerTitle}>Loading...</span>
        </div>
        <p style={styles.message}>Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="app-background" style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate('/events')}>
            ← Back
          </button>
          <span style={styles.headerTitle}>Error</span>
        </div>
        <p style={styles.message}>{error || 'Event not found'}</p>
      </div>
    );
  }

  return (
    <div className="app-background" style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/events')}>
          ← Back
        </button>
        <span style={styles.headerTitle}>{event.title}</span>
      </div>

      <div style={styles.scrollContainer}>
        {event.image_url && (
          <img src={event.image_url} alt={event.title} style={styles.eventImage} />
        )}

        <div style={styles.content}>
          <div style={styles.title}>{event.title}</div>

          {event.event_type && (
            <span style={styles.badge}>{event.event_type}</span>
          )}

          <div style={styles.infoRow}>
            <span style={styles.infoIcon}>📅</span>
            <span>{formatDateTime(event.start_datetime)}</span>
          </div>

          {event.location && (
            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>📍</span>
              <span>{event.location}</span>
            </div>
          )}

          {event.organizer && (
            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>👤</span>
              <span>{event.organizer}</span>
            </div>
          )}

          {event.description && (
            <div style={styles.description}>{event.description}</div>
          )}

          <button
            style={isScheduled ? styles.disabledButton : styles.scheduleButton}
            onClick={handleScheduleEvent}
            disabled={actionLoading || isScheduled}
          >
            {actionLoading ? 'Scheduling...' : '📅 Schedule Event'}
          </button>

          {message && (
            <div style={messageType === 'success' ? styles.successMessage : styles.warningMessage}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
