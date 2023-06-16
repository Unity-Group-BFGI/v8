const Sanitize = (text = "") => {
    return text.replace(/(<([^>]+)>)/gi, "");
};

module.exports = Sanitize;