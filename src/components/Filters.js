import React, { useState } from 'react'

import { MdDeleteForever } from "react-icons/md";

export default function Filter({deleteAllNotes}) {
    return (
        <button onClick={deleteAllNotes} className="bulk-delete">
          <MdDeleteForever className="delete-icon" style={{ marginBottom: "-3px", marginRight: "5px" }} />
          Delete All Notes
        </button>
    )
}