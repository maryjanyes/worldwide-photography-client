const footerLinks = [{
    title: "common.footer_links.contacts_placeholder",
    blocks: [{
        text: "wf@gmail.com",
        isPlaceholder: false,
    }, {
        text: "common.footer_links.blocks.send_chat_message",
        isPlaceholder: true,
    }],
}, {
    title: "common.footer_links.site_links_placeholder",
    blocks: [{
        text: "nav_links.gallery",
        isPlaceholder: true,
        to: "/gallery",
    }, {
        text: "nav_links.contests",
        isPlaceholder: true,
        to: "/contests",
    }],
}];

export default footerLinks;
