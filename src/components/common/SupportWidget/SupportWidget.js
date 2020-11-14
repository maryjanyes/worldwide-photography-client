import React, { useState } from 'react'

const SupportWidget = () => {
    const [helpNeeded, setHelpNeeded] = useState(false)

    return (
        <div className="support-widget">
            <span>WorldwidePhotography team always here to help you.</span>
            <button>Get help</button>
            {helpNeeded && <p>widget</p>}
        </div>
    )
}

export default SupportWidget
