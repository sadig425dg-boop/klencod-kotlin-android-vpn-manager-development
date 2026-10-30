package com.vpn.manager.xray.service

import android.content.Intent
import android.net.VpnService
import android.os.ParcelFileDescriptor
import android.util.Log
import com.vpn.manager.xray.core.XrayCore
import kotlinx.coroutines.*
import java.io.FileInputStream
import java.io.FileOutputStream
import java.nio.ByteBuffer

class XrayVpnService : VpnService() {
    private var vpnInterface: ParcelFileDescriptor? = null
    private val serviceScope = CoroutineScope(Dispatchers.IO + Job())
    private var xrayProcess: Process? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action
        if (action == "STOP") {
            stopVpn()
            return START_NOT_STICKY
        }
        
        val configJson = intent?.getStringExtra("CONFIG_JSON") ?: ""
        startVpn(configJson)
        return START_STICKY
    }

    private fun startVpn(configJson: String) {
        serviceScope.launch {
            try {
                // 1. Setup TUN interface
                vpnInterface = Builder()
                    .addAddress("10.0.0.1", 24)
                    .addRoute("0.0.0.0", 0)
                    .addDnsServer("8.8.8.8")
                    .setSession("VPNManager-Xray")
                    .setBlocking(true)
                    .establish()

                // 2. Start Xray Core
                XrayCore.start(configJson)
                
                // 3. Datapath forwarding (Go based logic would be here)
                Log.d("VPN_SERVICE", "VPN Tunnel established")
            } catch (e: Exception) {
                Log.e("VPN_SERVICE", "Failed to start VPN", e)
                stopSelf()
            }
        }
    }

    private fun stopVpn() {
        vpnInterface?.close()
        vpnInterface = null
        XrayCore.stop()
        stopSelf()
    }

    override fun onDestroy() {
        super.onDestroy()
        serviceScope.cancel()
    }
}
