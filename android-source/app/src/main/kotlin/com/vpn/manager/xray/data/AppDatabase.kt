package com.vpn.manager.xray.data

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Entity(tableName = "servers")
data class VpnServer(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val name: String,
    val protocol: String,
    val config: String,
    val ping: Int = 0,
    val isFavorite: Boolean = false,
    val lastUsed: Long = 0
)

@Dao
interface ServerDao {
    @Query("SELECT * FROM servers ORDER BY lastUsed DESC")
    fun getAllServers(): Flow<List<VpnServer>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertServer(server: VpnServer)

    @Delete
    suspend fun deleteServer(server: VpnServer)
    
    @Query("UPDATE servers SET lastUsed = :timestamp WHERE id = :id")
    suspend fun updateLastUsed(id: Int, timestamp: Long)
}

@Database(entities = [VpnServer::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun serverDao(): ServerDao
}
