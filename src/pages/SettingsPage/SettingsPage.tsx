import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SettingsPage.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import Header from '../../components/Header/Header';
import Footer from '../../service/Footer/Footer';
import Button from '../../components/Button/Button';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import { Sun, Moon, LogOut, User, Lock, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const settingsOptions = [
    { 
      label: t('settings.account_settings'), 
      icon: <User size={20} />, 
      path: '/settings/account' 
    },
    { 
      label: t('settings.privacy_and_security'), 
      icon: <Lock size={20} />, 
      path: '/settings/privacy' 
    },
    // Add more settings as needed
  ];

  const getThemeIcon = () => (
    theme === 'light' ? <Sun size={20} /> : <Moon size={20} />
  );

  return (
    <div className={`${styles.settingsPage} ${styles[theme]}`}>
      <Header title={t('settings.title')} showBack={true} />
      
      <main className={styles.content}>
        <h2 className={styles.sectionTitle}>{t('settings.general_preferences')}</h2>
        
        <div className={styles.settingGroup}>
          
          {/* Theme Toggle */}
          <div className={styles.settingItem}>
            <div className={styles.settingIcon}>{getThemeIcon()}</div>
            <span className={styles.settingLabel}>{t('settings.dark_mode')}</span>
            <div className={styles.settingControl}>
              <ToggleSwitch 
                checked={theme === 'dark'} 
                onChange={toggleTheme} 
              />
            </div>
          </div>

          {/* Language Selection */}
          <div className={styles.settingItem}>
            <span className={styles.settingLabel}>{t('settings.language')}</span>
            <div className={styles.settingControl}>
              <select
                className={styles.languageSelect}
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="en">{t('settings.lang_english')}</option>
                <option value="ar">{t('settings.lang_arabic')}</option>
              </select>
            </div>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>{t('settings.account_management')}</h2>

        <div className={styles.settingGroup}>
          {settingsOptions.map((option) => (
            <div 
              key={option.path} 
              className={styles.settingItem} 
              onClick={() => navigate(option.path)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.settingIcon}>{option.icon}</div>
              <span className={styles.settingLabel}>{option.label}</span>
              <ChevronRight size={20} className={styles.chevronIcon} />
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className={styles.logoutSection}>
          <Button 
            onClick={handleLogout} 
            variant="danger" 
            fullWidth
            icon={<LogOut size={20} />}
          >
            {t('settings.logout')}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;