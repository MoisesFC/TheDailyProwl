import './App.css';
import Sun from './assets/Page1/sun.png';
import Owl from './assets/Page1/owl.png';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from './lib/supabaseClient';

const MAJORS = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Cybersecurity',
  'Data Science',
  'Business Administration',
  'Nursing',
  'Psychology',
  'Biology',
  'Engineering',
  'Communications',
  'Education',
  'Other'
];

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [major, setMajor] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password || !confirmPassword || !firstName || !lastName || !major) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.endsWith("@students.kennesaw.edu")) {
      setError("Please use your KSU student email.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (!authData.user) {
        setError("Signup failed. Please try again.");
        return;
      }

      // Get the user ID from auth response
      const userId = authData.user.id;
      console.log('Auth signup successful. User ID:', userId);

      // Insert user data into STUDENT table
      const studentData = {
        student_id: userId,
        ksu_email: email,
        first_name: firstName,
        last_name: lastName,
        major: major
      };
      console.log('Inserting student data:', studentData);

      const { data: insertData, error: insertError } = await supabase
        .from('student')
        .insert(studentData)
        .select();

      console.log('Insert response - data:', insertData, 'error:', insertError);

      if (insertError) {
        console.error('Error inserting student:', insertError);
        setError(`Profile setup failed: ${insertError.message}`);
        return;
      }

      console.log('Student insert successful, navigating to /third');
      // Navigate to main page only if both auth signup AND student insert succeed
      navigate('/third');
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '20px',
      paddingBottom: '40px',
      overflowY: 'auto'
    },
    form: {
      width: '90%',
      maxWidth: '380px',
      marginTop: '20px'
    },
    inputGroup: {
      marginBottom: '15px'
    },
    label: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.2rem',
      color: 'white',
      display: 'block',
      marginBottom: '5px'
    },
    input: {
      width: '100%',
      height: '45px',
      padding: '0 15px',
      boxSizing: 'border-box',
      border: 'none',
      borderRadius: '25px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: '#333'
    },
    select: {
      width: '100%',
      height: '45px',
      padding: '0 15px',
      boxSizing: 'border-box',
      border: 'none',
      borderRadius: '25px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: '#333',
      cursor: 'pointer'
    },
    button: {
      width: '100%',
      height: '50px',
      marginTop: '20px',
      border: 'none',
      borderRadius: '25px',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1.3rem',
      fontWeight: 'bold',
      backgroundColor: '#f8bd00',
      color: '#171513',
      cursor: 'pointer',
      boxShadow: '0 4px 0 rgba(0,0,0,.35)'
    },
    error: {
      color: '#ff6b6b',
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      textAlign: 'center',
      marginTop: '10px'
    },
    link: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: '1rem',
      color: 'white',
      textAlign: 'center',
      marginTop: '20px'
    },
    linkText: {
      color: '#4da6ff',
      textDecoration: 'underline',
      cursor: 'pointer'
    },
    title: {
      fontFamily: "'Burbank Big Condensed', sans-serif",
      fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
      color: 'white',
      textAlign: 'center',
      marginTop: '10px',
      marginBottom: '10px'
    }
  };

  return (
    <div className="app-background" style={styles.container}>
      <img src={Sun} alt="Sun" className="sun-icon" style={{ position: 'relative', width: '80px' }} />
      <h1 style={styles.title}>Create Account</h1>
      <img src={Owl} alt="KSU Owl Logo" style={{ width: '80px', marginBottom: '10px' }} />

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>First Name</label>
          <input
            type="text"
            placeholder="Enter your first name..."
            style={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name..."
            style={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>KSU Email</label>
          <input
            type="email"
            placeholder="yourname@students.kennesaw.edu"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Major</label>
          <select
            style={styles.select}
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          >
            <option value="">Select your major...</option>
            {MAJORS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Create a password..."
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password..."
            style={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p style={styles.link}>
        Already have an account? <Link to="/" style={styles.linkText}>Log In</Link>
      </p>
    </div>
  );
}

export default SignupPage;

