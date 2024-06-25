import "../styles/Profile.css";

export default function Profile({ profilePic }) {
    return (
        <div className="profile" aria-label="Profile">
            <img src={profilePic} alt="Profile picture" />
        </div>
    )
}