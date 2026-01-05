import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonAvatar, IonText, IonButton, IonIcon, IonCard, IonCardContent, IonLabel, IonItem, IonList, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import { ellipsisHorizontal, pencilOutline, globeOutline, informationCircleOutline, businessOutline, locationOutline, mailOutline, callOutline, calendarOutline, addOutline, logOutOutline } from 'ionicons/icons';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const user = {
    name: 'محمد علي',
    bio: 'مطور برمجيات | مهتم بالذكاء الاصطناعي',
    profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1510915228337-9c348e14790c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    details: [
      { icon: businessOutline, text: 'يعمل في Meta Platforms' },
      { icon: globeOutline, text: 'درس في جامعة الملك فهد للبترول والمعادن' },
      { icon: locationOutline, text: 'يعيش في الرياض، المملكة العربية السعودية' },
      { icon: mailOutline, text: 'mohammad.ali@example.com' },
      { icon: calendarOutline, text: 'انضم في يناير 2012' },
    ],
    friendsCount: 1200,
  };

  const friends = [
    { name: 'أحمد سعيد', avatar: 'https://images.unsplash.com/photo-1507003211169-0a8274681794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
    { name: 'فاطمة خالد', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { name: 'يوسف ناصر', avatar: 'https://images.unsplash.com/photo-1547425260-76bc0fc6e7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { name: 'هند سليمان', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80' },
    { name: 'ماجد فيصل', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
    { name: 'نورة عادل', avatar: 'https://images.unsplash.com/photo-1554151228-14d9cfd7b1f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
  ];

  return (
    <IonPage dir="rtl">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/home" />
          </IonButtons>
          <IonTitle>{user.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ellipsisHorizontal} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="profile-page">
        {/* Cover Photo Area */}
        <div className="cover-photo" style={{ backgroundImage: `url(${user.coverPhoto})` }}>
          <div className="cover-edit-button">
            <IonButton size="small" fill="solid" className="ion-margin-end">
              <IonIcon icon={pencilOutline} slot="start" />
              تعديل الغلاف
            </IonButton>
          </div>
        </div>

        {/* Profile Info Area */}
        <div className="profile-info ion-padding-horizontal">
          <div className="avatar-section">
            <IonAvatar className="profile-avatar">
              <img alt={user.name} src={user.profilePicture} />
            </IonAvatar>
            <div className="avatar-edit-button">
              <IonButton size="small" shape="round">
                <IonIcon icon={pencilOutline} />
              </IonButton>
            </div>
          </div>

          <IonText color="dark">
            <h1 className="ion-no-margin ion-padding-top">{user.name}</h1>
          </IonText>
          <IonText color="medium">
            <p className="ion-margin-vertical">{user.bio}</p>
          </IonText>

          {/* Action Buttons */}
          <IonRow className="ion-padding-vertical">
            <IonCol size="6">
              <IonButton expand="block" color="primary">
                <IonIcon icon={addOutline} slot="start" />
                إضافة إلى القصة
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="block" fill="solid" color="light">
                <IonIcon icon={pencilOutline} slot="start" />
                تعديل الملف الشخصي
              </IonButton>
            </IonCol>
          </IonRow>

          <hr className="divider" />

          {/* User Details */}
          <IonList lines="none" className="ion-no-padding">
            {user.details.map((detail, index) => (
              <IonItem key={index} className="detail-item" detail={false}>
                <IonIcon icon={detail.icon} slot="start" color="medium" />
                <IonLabel>{detail.text}</IonLabel>
              </IonItem>
            ))}
            <IonItem className="detail-item" detail={false}>
              <IonIcon icon={logOutOutline} slot="start" color="medium" />
              <IonLabel color="primary">
                <IonText color="primary">تسجيل الخروج</IonText>
              </IonLabel>
            </IonItem>
          </IonList>

          <IonButton expand="block" fill="clear" color="primary" className="ion-margin-vertical">
            عرض معلومات حولك
          </IonButton>

          <hr className="divider" />

          {/* Friends Section */}
          <div className="friends-section ion-padding-vertical">
            <IonRow className="ion-align-items-center ion-justify-content-between">
              <IonCol size="auto">
                <IonText color="dark">
                  <h2>الأصدقاء</h2>
                </IonText>
              </IonCol>
              <IonCol size="auto">
                <IonText color="medium">
                  <p>{user.friendsCount.toLocaleString()} صديق</p>
                </IonText>
              </IonCol>
            </IonRow>

            <IonRow className="friends-grid ion-margin-top">
              {friends.slice(0, 6).map((friend, index) => (
                <IonCol size="4" key={index} className="friend-col ion-padding-bottom">
                  <IonCard className="friend-card ion-no-margin">
                    <img alt={friend.name} src={friend.avatar} />
                    <IonCardContent className="ion-padding-vertical ion-text-center">
                      <IonText color="dark">
                        <small>{friend.name}</small>
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>

            <IonButton expand="block" fill="solid" color="light" className="ion-margin-top">
              عرض جميع الأصدقاء
            </IonButton>
          </div>

          <hr className="divider" />
          
          {/* Posts Section Placeholder */}
          <div className="posts-placeholder ion-text-center ion-padding-vertical">
            <IonIcon icon={informationCircleOutline} size="large" color="medium" />
            <IonText color="medium">
              <p>لم يتم عرض المشاركات في هذا العرض.</p>
            </IonText>
          </div>

        </div>

        <div style={{ height: '50px' }}></div> {/* Spacer */}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;