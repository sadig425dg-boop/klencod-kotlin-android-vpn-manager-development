package com.vpn.manager.xray.shizuku

import android.content.Context
import android.content.pm.PackageManager
import dev.rikka.shizuku.Shizuku
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

object ShizukuManager {
    private val _status = MutableStateFlow<ShizukuStatus>(ShizukuStatus.DISCONNECTED)
    val status: StateFlow<ShizukuStatus> = _status

    enum class ShizukuStatus {
        DISCONNECTED,
        CONNECTED,
        UNAUTHORIZED,
        NOT_INSTALLED
    }

    fun checkStatus(context: Context) {
        if (!isInstalled(context)) {
            _status.value = ShizukuStatus.NOT_INSTALLED
            return
        }

        if (Shizuku.pingBinder()) {
            if (Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED) {
                _status.value = ShizukuStatus.CONNECTED
            } else {
                _status.value = ShizukuStatus.UNAUTHORIZED
            }
        } else {
            _status.value = ShizukuStatus.DISCONNECTED
        }
    }

    private fun isInstalled(context: Context): Boolean {
        return try {
            context.packageManager.getPackageInfo("dev.rikka.shizuku", 0)
            true
        } catch (e: PackageManager.NameNotFoundException) {
            false
        }
    }
    
    fun requestPermission() {
        if (Shizuku.checkSelfPermission() != PackageManager.PERMISSION_GRANTED) {
            Shizuku.requestPermission(0)
        }
    }
}
