import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Profile(props) {
  const [localGroups, setLocalGroups] = useState(props.userDetails.userGroups);

  const { children, ...attributes } = props;
  const propTypes = {
    children: PropTypes.node
  };

  const defaultProps = {};
  Profile.propTypes = propTypes;
  Profile.defaultProps = defaultProps;

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    console.log(props);
  }

  const upstate = async () => {
    var a = localGroups;
    a.push("test");
    setLocalGroups(a);
    console.log(localGroups);
  };

  return (
    <div>
      {localGroups.map(group => (
        <p id={group.key}>{group}</p>
      ))}
      <p>
        <button onClick={upstate}>Update groups</button>
      </p>
    </div>
  );
}

Profile.propTypes = {};

export default Profile;
