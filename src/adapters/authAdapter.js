export default function authAdapter({ id, name, lastname, phone, country, email, username, created_at, extras, role, status, token, acceptedTermsConditions , description, profile_picture  }) {
  return {
    id,
    displayName: name,
    lastName: lastname,
    phone,
    country,
    email,
    username,
    createdAt: created_at,
    extras,
    rol: role,
    status,
    acceptedTermsConditions,
    token,
    profilePicture: profile_picture,
    description
  };
}
