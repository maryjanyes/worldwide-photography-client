const commonStyle = {
    position: "absolute",
    top: 0,
    zIndex: 0,
  },
  activeStyle = {
    zIndex: 20,
    backgroundColor: "transparent",
    position: "fixed",
    top: "20%",
    left: "10%",
  };

  const getIconStyle = (activeVisibleSub, contests_submittion_id) => ({
    ...commonStyle,
    ...(isVisible &&
      activeVisibleSub === contests_submittion_id &&
      activeStyle),
  });