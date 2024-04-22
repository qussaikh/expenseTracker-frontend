
import React from 'react'

const FooterComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '10vh', backgroundColor: '#fffbea'}}>
      <footer style={{
        height: '70px',
        marginTop: 'auto',
        width: '100%',
        background: '#9fcabd',
        textAlign: 'center',
        padding: '10px'

      }}>

        <p className='text-center' style={{
          textAlign: 'center',
          color: '#40666b'
        }}>© 2024 Copyrights reserved at Qussai Khalil</p>
      </footer>
    </div>
  )
}

export default FooterComponent